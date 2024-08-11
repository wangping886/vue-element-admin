<template>
  <el-card style="margin-bottom:20px;">
    <div slot="header" class="clearfix">
      <span>关于我</span>
    </div>

    <div class="user-profile">
      <div class="box-center">
        <pan-thumb :image="user.avatar" :height="'100px'" :width="'100px'" :hoverable="false">
          <div>Hello</div>
          {{ user.name }}
        </pan-thumb>
      </div>
      <div class="box-center">
        <div class="user-name text-center">{{ user.name }}</div>
      </div>
    </div>

    <div class="user-bio">
      <!-- <div class="user-education user-bio-section">
        <div class="user-bio-section-header"><svg-icon icon-class="education" /><span>Education</span></div>
        <div class="user-bio-section-body">
          <div class="text-muted">
            JS in Computer Science from the University of Technology
          </div>
        </div>
      </div> -->

      <div>
        <el-row :gutter="20">
          <el-col :span="6">
            <div>
              <el-statistic group-separator="," :value="value1" :title="title1"></el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic group-separator="," :value="value2" :title="title2"></el-statistic>

            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic group-separator="," :value="value3" :title="title3">

              </el-statistic>
            </div>
          </el-col>
          <el-col :span="6">
            <div>
              <el-statistic title="会员有效期至">
                <template slot="formatter">
                  {{ vipExpire }}
                </template>
                <template slot="suffix">
                  <span class="like">
                    <i class="el-icon-star-on" style="color:red" v-show="like"></i>
                  </span>
                </template>
              </el-statistic>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getUserInfo } from '@/api/user';
import PanThumb from '@/components/PanThumb'

export default {
  components: { PanThumb },
  created() {
    this.getUserInfo();
  },
  data() {
    return {
      like: true,
      value1: 0,
      value2: 0,
      value3: 0,
      title1: "高清次数",
      title2: "超清次数",
      title3: "视频能量值",
      vipExpire: '---',
      name: '',
      avatar: '',
    };
  },
  props: {
    user: {
      type: Object,
      default: () => {
        return {
          name: '',
          email: '',
          avatar: '',
          role: ''
        }
      }
    }
  },
  methods: {
    getUserInfo() {
      getUserInfo().then(response => {
        const { data } = response
        console.log('getUserInfo res', response, 'data', data)
        this.value1 = data.remain_num
        this.value2 = data.super_remain
        this.value3 = data.energy
        this.vipExpire = data.expire_at.substring(0, 10)
      }).catch(error => {
        console.log('payGoods err', error)
      })

    }
  }
}
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.like {
  cursor: pointer;
  font-size: 25px;
  display: inline-block;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
