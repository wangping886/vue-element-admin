<template>
  <div class="app-container">

    <div v-if="user">
      <el-row :gutter="20">

        <el-col :span="20" :xs="24">
          <user-card :user="user" />
        </el-col>

        <!-- <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="Activity" name="activity">
                <activity />
              </el-tab-pane>
              <el-tab-pane label="Timeline" name="timeline">
                <timeline />
              </el-tab-pane>
              <el-tab-pane label="Account" name="account">
                <account :user="user" />
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col> -->

      </el-row>
    </div>
    <!-- <el-row>
      <el-col :span="8" v-for="(item, index) in this.apiSetting.goods" :key="index" :offset="index > -1 ? 2 : 0">
        <el-card :body-style="{ padding: '2px', margin: '5px' }">
          <div style="padding: 14px;">
            <span>{{ item.title }}</span>
            <div class="bottom clearfix">
              <time class="time">{{ item.price }}</time>
              <el-button type="text" @click="payGoodsMethod()" class="button">支付</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <QrCode :text="qrText" /> -->


    <el-dialog title="可用次数不足，请充值" :visible.sync="dialogFormVisible">

      <el-row v-loading="payLoading" element-loading-text="支付发起中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <el-col :span="8" v-for="(item, index) in this.apiSetting.goods" :key="index" :offset="index > -1 ? 2 : 0">
          <el-card :body-style="{ padding: '2px', margin: '5px' }">
            <div style="padding: 14px;">
              <span>{{ item.title }}</span>
              <div class="bottom clearfix">
                <time class="time">{{ item.price }}</time>
                <el-button type="text" @click="payGoodsMethod()" class="button">支付</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <el-dialog title="请使用微信扫码完成付款" :visible.sync="innerVisible" append-to-body center>

        <div class="dialog-content" width="30%">
          <div></div>
          <QrCode :text="qrText" />
        </div>
      </el-dialog>

      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div> -->
    </el-dialog>


  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import UserCard from './components/UserCard'
import Activity from './components/Activity'
import Timeline from './components/Timeline'
import Account from './components/Account'
import { payGoods } from '@/api/user'
import QrCode from '../qrcode/qrcode.vue'

export default {
  name: 'Profile',
  components: { UserCard, Activity, Timeline, Account, QrCode },
  data() {
    return {
      dialogFormVisible: false,
      innerVisible: false,
      payLoading: false,
      user: {},
      qrText: 'test',
      visible: false,
      activeTab: 'activity',
      currentDate: 111,
      cardData: [
        { title: '好吃的汉堡', price: '2024-08-07', buttonText: '操作按钮' },
        { title: '美味的披萨', price: '2024-08-07', buttonText: '操作按钮' },
        { title: '可口的炸鸡', price: '2024-08-07', buttonText: '操作按钮' },
        { title: '新鲜的寿司', price: '19.9', buttonText: '操作按钮' },
        { title: '香甜的冰淇淋', price: '2024-08-07', buttonText: '操作按钮' },
        { title: '丰富的沙拉', price: '2024-08-07', buttonText: '操作按钮' }
      ],
    }
  },

  created() {
    this.$store.dispatch('settings/apiSetting', '6');
    this.getUser();
  },
  computed: {
    apiSetting() {
      return this.$store.state.settings.apiSetting
    },
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  },
  methods: {
    getUser() {
      console.log('apiSetting res', this.apiSetting)
      this.user = {
        name: this.name,
        role: this.roles.join(' | '),
        email: 'admin@test.com',
        avatar: this.avatar,
      }
    },
    payGoodsMethod() {
      let req = {
        'product_id': 10002,
        'price': 240,
      }

      this.payLoading = true
      payGoods(req).then(response => {
        const { data } = response
        console.log('payGoods res', response, 'data', data)
        this.qrText = data.code_url
        console.log('qrText', this.qrText)
        this.innerVisible = true
        this.payLoading = false
      }).catch(error => {
        console.log('payGoods err', error)
      })
    }
  }
}
</script>
<style>
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.dialog-content {
  text-align: center;
}
</style>