#!/bin/bash
set -e # 当任何命令以非零状态退出时，立即退出整个脚本。

# 颜色定义（美化输出）
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

check_exists() {
    local path="$1"
    if [ ! -e "$path" ]; then
        echo -e "${RED}错误：未找到对应项目更新包 -> $path${NC}"
        exit 1
    fi

    local filename=$(basename "$path")
    local extension="${filename##*.}"
    extension=$(echo "$extension" | tr '[:upper:]' '[:lower:]')  # 转换为小写

    if [[ "$extension" != "zip" ]]; then
        echo -e "${RED}错误：不支持的文件格式 '$extension'，仅支持 .zip 格式的压缩包${NC}"
        exit 1
    fi
}

check_path() {
    local path="$1"

    echo "路径检查中..."
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

# ============================================
# 公共函数：打包备份
# 参数: $1 = 目标备份目录 (如 $version_history_dir/$TODAY/bak)
#       $2 = 备份包名     (如 ${project_name}.tar)
# 返回: 0=成功  1=跳过  其他=失败退出
# ============================================
do_backup() {
    local backup_dir="$1"
    local backup_name="$2"

    # 检查源目录是否有文件（含隐藏文件）
    if [ -n "$(ls -A "$input_project_full_path" 2>/dev/null)" ]; then
        # 有文件，执行打包
        mkdir -p "$backup_dir" || exit 1
        cd "$input_project_full_path" || exit 1
        tar -cf "$backup_dir/$backup_name" . || exit 1 # 包含隐藏文件
        echo -e "...备份已完成 -> $backup_dir/$backup_name"
        return 0
    else
        # 目录为空，询问用户
        echo -e "程序目录内容为空，请确认目录是否无误，如果继续则会在指定目录初始化并部署？(Y/N)"
        read -r user_input
        case "$user_input" in
            [Yy]|[Yy][Ee][Ss])
                echo -e "首次部署，正在跳过备份步骤..."
                return 0
                ;;
            *)
                echo -e "脚本终止"
                exit 1
                ;;
        esac
    fi
}

echo "注意事项："
echo "1. 更新包当前仅支持 zip 包，压缩包内务必符合以下结构，示例："
echo "dist.zip:"
echo "  index.html"
echo "  其余文件"
echo "或者"
echo "  dist/"
echo "  dist/index.html"
echo "  dist/其余文件"

# 1. 输入项目名（支持默认值）
read -p "请输入项目路径及目录名 [示例: /app/demo]: " input_project_full_path

check_path "$input_project_full_path"

mkdir -p "$input_project_full_path" # 若果不存在则为首次部署，直接创建相应目录

input_project_full_path=$(echo "$input_project_full_path" | sed 's:/*$::')  # 去除末尾斜杠
project_dir=$(dirname "$input_project_full_path")      # 获取目录路径
project_name=$(basename "$input_project_full_path")    # 获取项目名称

# 2. 输入更新包路径
read -p "请输入更新包路径及文件名（当前仅支持zip包）[示例: /tmp/dist.zip]: " input_package_path

check_exists "$input_package_path" # todo 这里需要限制 zip 包格式

# 获取文件列表
file_list=$(unzip -l "$input_package_path")

# 检查根目录的 index.html（排除子目录）
if echo "$file_list" | grep -q "^[[:space:]]*[0-9]\+[[:space:]]\+[0-9-]\+[[:space:]]\+[0-9:]\+[[:space:]]\+index.html$"; then
    echo "✓ 根目录存在入口文件"
# 检查 dist 目录下的 index.html
elif echo "$file_list" | grep -q "dist/index.html"; then
    echo "✓ dist 目录内存在入口文件"
else
    echo "✗ 未找到 index.html 入口文件"
    echo "非标准更新包，请按以下结构进行调整："
    echo "dist.zip:"
    echo "  index.html"
    echo "  其余文件"
    echo "或者"
    echo "  dist/"
    echo "  dist/index.html"
    echo "  dist/其余文件"
    exit 1
fi

echo -e "${GREEN}✓ 压缩包校验通过${NC}"

echo -e "正在进行备份..."
version_history_dir="$project_dir/${project_name}_version_history"

mkdir -p "$version_history_dir" # 确保版本历史目录存在
TODAY=$(date +"%Y%m%d")
mkdir -p "$version_history_dir/$TODAY"/{bak,update}

# 备份
if [ ! -f "$version_history_dir/$TODAY/bak/${project_name}.tar" ]; then
    # 当天首次备份
    echo -e "正在进行首次备份..."
    do_backup "$version_history_dir/$TODAY/bak" "${project_name}.tar"
else
    # 当天已有备份，询问是否带时间戳再次备份
    echo -e "备份包已存在：$version_history_dir/$TODAY/bak/${project_name}.tar"
    TODAY_WITH_TIME=$(date +"%Y%m%d-%H%M%S")
    echo -e "是否对版本号添加时间后缀后再次备份？(Y/N) [$version_history_dir/$TODAY_WITH_TIME]"
    echo -e "${YELLOW}[提示：若当前版本程序运行异常，请您跳过备份]${NC}"
    read -r user_input
    case "$user_input" in
        [Yy]|[Yy][Ee][Ss])
            do_backup "$version_history_dir/$TODAY_WITH_TIME/bak" "${project_name}.tar"
            ;;
        *)
            echo -e "跳过备份，继续执行..."
            ;;
    esac
fi

# 更新包就位
mv "$input_package_path" "$version_history_dir/$TODAY/update/dist.zip"

echo -e "正在进行更新..."

if [ -d "$input_project_full_path" ]; then
    # 使用变量并检查非空，避免误删除
    if [ -n "$input_project_full_path" ] && [ "$input_project_full_path" != "/" ]; then
        shopt -s dotglob
        rm -rf "${input_project_full_path:?}"/*
        shopt -u dotglob
    fi
fi

cd "$input_project_full_path" # 当前目录内已被清空
unzip "$version_history_dir/$TODAY/update/dist.zip"

if [ -d "./dist" ]; then
    cp -a ./dist/. . 2>/dev/null || true
    rm -rf ./dist
fi

sudo chmod -R 755 "$input_project_full_path"
echo -e "...自动更新已完成"
