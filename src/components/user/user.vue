<template>
  <transition name="slide">
    <div class="user-wrap">
        <i class="icon-back" @click="$router.back()"></i>
        <div class="switches-box">
            <switches :switches="switches" :currentIndex="currentIndex" @switch="switchItem"></switches>
      </div>
      <div ref="playBtn" class="play-btn" @click="random">
        <i class="icon-play"></i>
        <span class="text">随机播放全部</span>
      </div>
      <div class="list-box" ref="listBox">
        <scroll class="list-scroll" :data="favoriteList" v-if="currentIndex == 0" ref="listScroll">
          <div class="list-inner">
            <song-list :songs="favoriteList" @select="selectSong"></song-list>
          </div>
        </scroll>
        <scroll class="list-scroll" :data="playHistory" v-if="currentIndex == 1" ref="listScroll">
          <div class="list-inner">
            <song-list :songs="playHistory" @select="selectSong"></song-list>
          </div>
        </scroll>
      </div>
      <div class="no-result-box" v-show="noResult">
        <no-result :title="noResultDesc"></no-result>
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import Song from '../../common/js/song'
  import {playlistMixin} from '../../common/js/mixin'

  export default {
    data() {
      return {
        switches: [
          {
            name: '我喜欢的1'
          },
          {
            name: '最近听的2'
          }
        ],
        currentIndex: 0
      }
    },
    computed: {
      noResult() {
        return this.currentIndex == 0 ? !this.favoriteList.length : !this.playHistory.length
      },
      noResultDesc() {
        return this.currentIndex == 0 ? '暂无收藏歌曲' : '你还没有听过歌曲'
      },
      ...mapGetters(['favoriteList', 'playHistory'])
    },
    methods:{
        random(){
            let list = this.currentIndex == 0 ? this.favoriteList : this.playHistory
            if (!list.length) {
              return
            }
            list = list.map((song) => {
              return new Song(song)
            })
            this.randomPlay({list})
        },
        selectSong(song) {
          this.insertSong(new Song(song))
        },
        switchItem(index) {
          this.currentIndex = index
        },
        ...mapActions(['insertSong', 'randomPlay'])
    }
  }
</script>

<style lang="scss">
  @import "../../common/scss/variable";
.user-wrap{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: $color-background;
    &.slide-enter-active, &.slide-leave-active {
      transition: all .3s;
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0);
    }
    .icon-back {
      position: absolute;
      top: 0;
      left: .3rem;
      padding: .5rem;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
    .switches-box {
      margin: .5rem 0 1.5rem;
    }
    .play-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 6.75rem;
      margin: 0 auto;
      padding: .35rem 0;
      color: $color-text-l;
      border: 1px solid $color-text-l;
      border-radius: 5rem;
      box-sizing: border-box;
      .icon-play {
        margin-right: .3rem;
        font-size: $font-size-medium-x;
      }
      .text {
        font-size: $font-size-small;
      }
    }
}

</style>
