<template>
    <div>
        <!-- <div style="display:flex ; justify-content:space-between;">
            <el-image :src="url" :fit="fit"></el-image>
            <el-image :src="url" :fit="fit"></el-image>
        </div>
        <div style="display:flex ; justify-content:space-between;">
            <el-button :loading="loading" type="primary" style="margin:auto;">Login</el-button>
            <el-button :loading="loading" type="primary" style="margin:auto;">Login</el-button>
        </div>-->
        <el-row :gutter="12">
            <el-col :span="6">
                <div style="display: flex; flex-direction: column; 
                align-items: center;justify-content: center; height: 76vh;">
                    <el-upload class="upload-demo" drag :on-change="imgRestore" action="" :auto-upload="false"
                        :show-file-list="false" style="height: 32vh; margin-top: 5vh;">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">
                            将文件拖到此处，或<em>点击上传</em>
                        </div>
                    </el-upload>

                    <div width="100%" style="height: 2vh ;margin-bottom: 2vh;">
                        <el-radio v-model="radio" label="1">高清修复</el-radio>
                        <el-radio v-model="radio" label="2">超清修复</el-radio>
                    </div>
                    <el-image v-if="url" class="img-show" style="width: 100%; height: 46vh" :src="url"
                        :fit="fit"></el-image>
                </div>
            </el-col>

            <el-col :span="14">
                <div style="display: flex; flex-direction: column; align-items: center">
                    <el-image class="img-show" style="width: 100%; height: 76vh" :src="restoredUrl"
                        :preview-src-list="srcList" :fit="fit"></el-image>
                    <el-button style="margin-top: 15px" @click="downloadImage()" type="primary">图片保存</el-button>
                </div>
            </el-col>
        </el-row>
        <!-- <div style="margin: 10px;">
            <el-radio v-model="radio" label="1">备选项</el-radio>
            <el-radio v-model="radio" label="2">备选项</el-radio>
        </div> -->
        <!-- <el-row>
            <el-button @click="downloadImage()" type="primary">图片保存</el-button>
        </el-row> -->

        <Paygoods :dialogParamVisible="showPay" :goodsType="goodsType"></Paygoods>
    </div>
</template>

<script>
import { apiSetting, restoreImg } from "@/api/user";
import { saveAs } from "file-saver";
import Paygoods from "../paygoods/paygoods.vue";
import QrCode from "../qrcode/qrcode.vue";

export default {
    components: { Paygoods, QrCode },
    name: "Restore",
    data() {
        return {
            showPay: false, //根据有无可用次数修改
            goodsType: "4",
            fit: "contain",
            url: "https://cdn.ai-age.cn/setting_media/common0.jpeg?x-oss-process=image/quality,60",
            restoredUrl: "https://cdn.ai-age.cn/setting_media/common1.jpeg",
            radio: "1",
            srcList: [
                "https://cdn.ai-age.cn/setting_media/common0.jpeg?x-oss-process=image/quality,60",
                "https://cdn.ai-age.cn/setting_media/common1.jpeg",
            ],
        };
    },
    created() {
        this.$store.dispatch("settings/apiSetting", "4");
    },
    computed: {
        apiSetting() {
            return this.$store.state.settings.apiSetting;
        },
    },
    methods: {
        imgRestore(file, fileList) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.url = e.target.result;
                console.log("file result", this.url);

                let req = {
                    model_type: 1,
                    img_data: this.url.split(",")[1],
                };
                let url;
                restoreImg(req)
                    .then((response) => {
                        const { data } = response;
                        if (response.code === 50004) {
                            console.log('not enough', 11)
                            this.showPay = true
                            return
                        }
                        this.restoredUrl = data.restored_oss;
                        const arr = [data.restored_oss, data.origin_oss]; // ["hello", "world"]
                        this.srcList = arr;
                        console.log(
                            "restore data",
                            response,
                            "data",
                            data,
                            this.restoredUrl
                        );
                    })
                    .catch((error) => {
                        console.log("restore err", error);
                    });
            };
            reader.readAsDataURL(file.raw);
        },
        async downloadImage() {
            console.log("print state", this.showLogo);
            console.log("apiSetting", this.$store.state.settings.apiSetting);
            console.log("apiSetting", this.apiSetting);

            try {
                const response = await fetch(this.restoredUrl, {
                    method: "GET",
                    mode: "cors", // 确保请求的模式为 CORS
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const blob = await response.blob();
                saveAs(blob, "image.jpg"); // 使用 file-saver 保存文件
            } catch (error) {
                console.error("下载图片失败", error);
            }
        },
    },
};
</script>

<style>
.container {
    display: flex;
}

.img-show {
    background-color: #e2e8ef;
}

.product-list {
    display: flex;
    flex-wrap: wrap;
}

.product-item {
    margin: 10px;
    padding: 20px;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
