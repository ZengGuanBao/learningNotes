<template>
  <div>
    <p>这是动态路由<br>当前语言：{{$i18n.locale === 'zh' ? '中文' : 'en'}}<br></p>
    <button @click="$root.$i18n.locale = 'zh'">中文</button>
    <button @click="$root.$i18n.locale = 'en'">en</button>
    <p>{{ $t('hello') }}</p>
    <p>{{ $t('message') }}</p>
  </div>
</template>

<script>
export default {
  name: 'HelloI18n'
}
</script>

<i18n>
{
  "en": {
    "hello": "Hello i18n in SFC!"
  },
  "zh": {
    "hello": "你好 i18n in SFC!"
  }
}
</i18n>
