<template>
  <div class="hello">
    <img @click="changeLangEvent" src="../assets/logo.png">
    <h1>{{$t('m.msg')}}</h1>
    <h2 v-text="$t('m.nav')"></h2>
    <ul>
      <li>{{$t('m.music')}}</li>
      <li>{{$t('m.findMusic')}}</li>
      <li>{{$t('m.myMusic')}}</li>
      <li>{{$t('m.friend')}}</li>
      <li>{{$t('m.musician')}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  methods: {
    changeLangEvent () {
      // this.$confirm('确定切换语言吗?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(() => {
      if (this.lang === 'zh-CN') {
        this.lang = 'en-US'
        this.$i18n.locale = this.lang
      } else {
        this.lang = 'zh-CN'
        this.$i18n.locale = this.lang
      }
      // }).catch(() => {
      //   this.$message({
      //     type: 'info'
      //   })
      // })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
