#!/bin/bash
set -e # 当任何命令以非零状态退出时，立即退出整个脚本。

# 颜色定义（美化输出）
RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

check_exists() {
    local path="$1"
    local msg="$2"
    if [ ! -e "$path" ]; then
        echo -e "${RED}$msg -> $path${NC}"
        exit 1
    fi
}

check_path() {
    local path="$1"

    echo "路径检查..."
    # 1. 判断是否为根路径
    if [ "$path" = "/" ]; then
        echo -e "${RED}错误：禁止在根目录部署项目${NC}"
        exit 1
    fi

    # 2. 判断是否为绝对路径（以 / 开头）
    if [[ "$path" =~ ^/ ]]; then

        # 2.1 判断绝对路径是否至少存在两级
        # 去除末尾的斜杠
        local clean_path="${path%/}"
        # 统计斜杠数量（排除开头的斜杠）
        local slash_count=$(echo "$clean_path" | cut -c2- | tr -cd '/' | wc -c)

        if [ $slash_count -ge 1 ]; then
            echo "✓ 路径检查通过"
        else
            echo "✗ 路径至少包含两级（如：/app/demo）"
            exit 1
        fi
    else
        echo "✗ 项目路径仅支持绝对路径（如：/app/demo）"
        exit 1
    fi
}

# 1. 输入项目名（支持默认值）
read -p "请输入项目完整路径 [示例: /app/demo]: " input_project_full_path
check_path "$input_project_full_path"

mkdir -p "$input_project_full_path" # 确保存在

input_project_full_path=$(echo "$input_project_full_path" | sed 's:/*$::')  # 去除末尾斜杠
project_dir=$(dirname "$input_project_full_path")      # 获取目录路径
project_name=$(basename "$input_project_full_path")    # 获取项目名称

version_history_dir="$project_dir/${project_name}_version_history"
mkdir -p "$version_history_dir"

found_dirs=()

# 匹配两种格式的目录，并查找其中的 bak/${project_name}.tar 文件
# 格式1: yyyymmdd
# 格式2: yyyymmdd-hhmmss

for dir in "$version_history_dir"/*/; do
    [ -d "$dir" ] || continue
    dir_name=$(basename "$dir")
    # 匹配 yyyymmdd 或 yyyymmdd-hhmmss 格式
    if [[ "$dir_name" =~ ^[0-9]{8}(-[0-9]{6})?$ ]] && [[ -f "$dir/bak/${project_name}.tar" ]]; then
        found_dirs+=("$dir_name")
    fi
done

# 检查是否找到版本
if [[ ${#found_dirs[@]} -eq 0 ]]; then
    echo -e "${RED}未找到有效版本包：$version_history_dir${NC}" >&2
    exit 1
fi

# 按名称倒序，获取最新版本
version=$(printf "%s\n" "${found_dirs[@]}" | sort -r | head -n1)

echo -e "当前最新版本号为：$version"
echo -e "是否使用该版本进行回滚？(Y/N) 输入 N 查看可回退版本列表"
read -r user_input
case "$user_input" in
    [Yy]|[Yy][Ee][Ss])
        # 继续
        ;;
    *)
        # $version_history_dir 下所有带有 ${project_name}.tar 的第一级子目录，每行只展示一个目录
        echo -e "$project_name 可回滚的版本号列表："
        for dir in "$version_history_dir"/*/; do
            dir_name=$(basename "$dir")
            if [[ "$dir_name" =~ ^[0-9]{8}(-[0-9]{6})?$ ]] && [[ -f "$dir/bak/${project_name}.tar" ]]; then
                echo "  $dir_name"
            fi
        done
        echo -e "请输入要回滚的版本号 [示例: $version]"
        read -r version
        ;;
esac

check_exists "$version_history_dir/$version/bak/${project_name}.tar" "错误：版本号输入有误，未找到对应版本包"

echo -e "正在回滚 $input_project_full_path 至 $version 版本..."

shopt -s dotglob
rm -rf "${input_project_full_path:?}"/*
shopt -u dotglob

cd "$input_project_full_path"
tar -xf "$version_history_dir/$version/bak/${project_name}.tar"

sudo chmod -R 755 "$input_project_full_path"
echo -e "$input_project_full_path 已成功回滚至 $version 版本"
