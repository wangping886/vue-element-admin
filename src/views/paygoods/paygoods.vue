<template>
    <el-dialog title="可用次数不足，请充值" :visible.sync="dialogVisible">

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
</template>

<script>
import { payGoods } from '@/api/user';
import QrCode from '../qrcode/qrcode.vue';

export default {
    components: { QrCode },
    created() {
        this.$store.dispatch('settings/apiSetting', this.goodsType);
    },
    computed: {
        apiSetting() {
            return this.$store.state.settings.apiSetting
        }
    },
    props: {
        dialogParamVisible: {
            type: Boolean,
            required: true
        },
        goodsType: {
            type: String,
            required: true
        }
    },
    watch: {
        dialogParamVisible(newVal) {
            // 监听 prop 的变化，处理逻辑
            console.log('dialogParamVisible:', newVal);
            this.dialogVisible = newVal
        }
    },
    data() {
        return {
            dialogVisible: this.dialogParamVisible,
            innerVisible: false,
            payLoading: false,
            qrText: 'test',
        }
    },
    methods: {
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
.dialog-content {
    text-align: center;
}
</style>