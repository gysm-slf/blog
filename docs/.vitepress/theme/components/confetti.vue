<script setup lang="ts">
import confetti from 'canvas-confetti'
import { inBrowser } from 'vitepress';

if (inBrowser) {

  const types = {
    'snow': function (): void {
      const duration = 15 * 1000;
      const animationEnd = Date.now() + duration;
      let skew = 1;

      function randomInRange (min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            // since particles fall down, skew start toward the top
            y: (Math.random() * skew) - 0.2
          },
          colors: ['#ffffff'],
          shapes: ['circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.4, 1),
          drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      }());
    },
    // 花瓣
    'petal': function (): void {
      const end = Date.now() + (2 * 1000);

      // go Buckeyes!
      const colors = ['#bb0000', '#ffffff'];

      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    },
    'randomDirection': function (): void {
      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      confetti({
        angle: randomInRange(55, 125),
        spread: randomInRange(50, 70),
        particleCount: randomInRange(50, 100),
        origin: { y: 0.6 }
      });
    }
  }

  type EffectType = keyof typeof types;
  const keys = Object.keys(types) as EffectType[];
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  types[randomKey]();
}
</script>

<template></template>

<!-- 如果npm打包报错，使用下面这种方式 -->
<!--
<script setup lang="ts">
import { onMounted } from 'vue';
import confetti from 'canvas-confetti';

onMounted(() => (
    /* 纸屑 */
    confetti({
      particleCount: 100,
      spread: 170,
      origin: { y: 0.6 },
    })
));

</script>-->
