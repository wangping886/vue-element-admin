<template>
    <div>
        <canvas ref="canvas"></canvas>
    </div>
</template>

<script>
import QRCode from 'qrcode'

export default {
    props: {
        text: {
            type: String,
            required: true
        }
    },
    mounted() {
        this.generateQRCode()
    },
    watch: {
        text() {
            this.generateQRCode()
        }
    },
    methods: {
        generateQRCode() {
            QRCode.toCanvas(this.$refs.canvas, this.text, { errorCorrectionLevel: 'H' }, function (error) {
                if (error) console.error(error)
                console.log('二维码生成成功')
            })
        }
    }
}
</script>