<template>
  <div class="recommend-wrap" ref="recommendWrap">
    <scroll class="main" :data="discList" ref="main">
      <div>
        <div class="banner" v-if="recommends.length">
          <slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl" alt="">
              </a>
            </div>
          </slider>
        </div>
        <div class="list-box">
          <h2 class="list-title" v-show="discList.length">热门歌单推荐</h2>
          <ul>
            <li class="item" v-for="item in discList" @click="selectItem(item)">
              <img class="avatar" width="60" height="60" v-lazy="item.imgurl" alt="">
              <div class="text">
                <h3 class="name" v-html="item.creator.name"></h3>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
    <router-view></router-view>
    <loading v-show="!discList.length"></loading>
  </div>
</template>

<script>
  import {getRecommend, getDiscList} from '../../api/recommend'
  import {ERR_OK} from '../../api/config'
  import {playlistMixin} from '../../common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    mixins: [playlistMixin],
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      handlePlaylist(playlist) {
        let bottom = playlist.length > 0 ? '3rem' : ''
        this.$refs.recommendWrap.style.bottom = bottom
        this.$refs.main.refresh()
      },
      selectItem(item) {
        console.log(item);
        this.$router.push({path: `/recommend/${item.dissid}`})
        this.setDisc(item)
      },
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            // console.log(res.data.slider);
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        getDiscList().then((res) => {
          // console.log('111getDiscList:',res);
          if (res.code == ERR_OK) {
            this.discList = res.data.list
          }
        })
      },
      ...mapMutations({
        setDisc: 'SET_DISC'
      })
    }
  }
</script>

<style scoped lang="scss">
  @import "../../common/scss/variable";

  .recommend-wrap {
    position: absolute;
    left: 0;
    top: 4.4rem;
    right: 0;
    bottom: 0;
    .main {
      height: 100%;
      overflow: hidden;
      .banner {
        position: relative;
        height: 0;
        width: 100%;
        padding-top: 40%;
        overflow: hidden;
      }
      .list-box {
        .list-title {
          line-height: 65px;
          text-align: center;
          font-size: $font-size-medium;
          color: $color-theme;
        }
        .item {
          display: flex;
          align-items: center;
          padding: 0 1rem 1rem;
          .avatar {
            flex: 0 0 3rem;
            width: 3rem;
            margin-right: 1rem;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 1rem;
            font-size: $font-size-medium;
            word-break: break-all;
            .name {
              margin-bottom: .5rem;
              color: $color-text;
            }
            .desc {
              color: $color-text-d;
            }
          }
        }
      }
    }
  }
</style>
