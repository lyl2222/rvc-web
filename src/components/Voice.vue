<template>
    <SvgIcon name="voice" size="30" class="emoji mr-4" @click="showVoice" />

    <el-dialog v-model="dialogVisible" title="录音" width="30%" :before-close="handleClose" :close-on-click-modal="false">

        <div v-if="isStart">


            <div class="mation mb-10">
                <div class="ap">
                    <div class="box">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>

            </div>


        </div>
        <div class="text-center">
            <audio class="mb-10" v-if="!isStart && hasVoice" :src="recordedAudio" controls="controls" ref="audio">
            </audio>
            <div>
                <el-button v-if="!isStart" class="startRecord" @click="voice">
                    <SvgIcon name="voiceStart" size="20" class="emoji mr-4" />
                    开始录音
                </el-button>
                <el-button v-else @click="handleStop">
                    <SvgIcon name="stop" size="20" class="emoji mr-4" />
                    停止录音
                </el-button>
                <el-button type="primary" v-if="!isStart && hasVoice" @click="submit">发送</el-button>
            </div>
        </div>

    </el-dialog>
</template>

<script setup>
import { ref, reactive } from 'vue'
import Recorder from 'js-audio-recorder'
//录音功能

let dialogVisible = ref()

const showVoice = () => {
    dialogVisible.value = true
}
const handleClose = () => {
    handleDestroy()

    dialogVisible.value = false
}

const data = reactive({
    //用于存储创建的语音对象
    recorder: null,
    formData: null,
    // 控制录音动画的显示隐藏
    showAnima: false,
    mation: true,
    isHistory: true,
    // 录音时长
    duration: 0,
    timer: null
})

const emit = defineEmits(['submit'])

const submit = () => { // 发送语音的方法
    data.recorder.pause() // 暂停录音
    data.timer = null
    console.log('上传录音')// 上传录音
    var formData = new FormData()
    var blob = data.recorder.getWAVBlob()//获取wav格式音频数据
    //此处获取到blob对象后需要设置fileName满足当前项目上传需求，其它项目可直接传把blob作为		  file塞入formData
    var newbolb = new Blob([blob], { type: 'audio/wav' })
    var fileOfBlob = new File([newbolb], new Date().getTime() + '.wav')
    //formData是传给后端的对象,
    formData.append('file', fileOfBlob)
    //计算出录音时长
    data.duration = Math.ceil((new Date() - data.duration) / 1000);
    console.log(data.duration);
    emit('submit', recordedAudio.value)
    handleClose()
    //发送给后端的方法
    // sendAudio(formData).then(res => {
    //   console.log(res);
    // })
}
let isStart = ref(false)
// 录音按钮的点击事件
const voice = () => {
    //实例化语音对象
    data.recorder = new Recorder({
        sampleBits: 16, // 采样位数，支持 8 或 16，默认是16
        sampleRate: 16000, // 采样率，支持 11025、16000、22050、24000、44100、48000，根据浏览器默认值，我的chrome是48000
        numChannels: 1 // 声道，支持 1 或 2， 默认是1
    })
    //记录开始录音的时间
    data.duration = new Date();
    Recorder.getPermission().then(() => {
        console.log('开始录音')
        isStart.value = true
        data.recorder.start() // 开始录音
    }, (error) => {
        console.log(`${error.name} : ${error.message}`)
    })
}

let hasVoice = ref(false)
let recordedAudio = ref()
const handleStop = () => {
    console.log('停止录音')
    data.recorder.stop() // 停止录音


    var blob = data.recorder.getWAVBlob()
    var newbolb = new Blob([blob], { type: 'audio/wav' })
    recordedAudio.value = URL.createObjectURL(newbolb);
    data.mation = false;
    isStart.value = false
    hasVoice.value = true

}

const handleDestroy = () => {
    if (data.recorder) {
        data.recorder.destroy() // 毁实例
    }
    isStart.value = false
    hasVoice.value = false
}

</script>


<style lang="scss" scoped>
.ap {
    position: relative;
    height: 50px;
    width: 30px;
    margin: 0 auto;
}


.box div {
    display: inline-block;
    position: absolute;
    bottom: 0;
    width: 4px;
    height: 30px;
    //不喜欢该颜色改成想要的动画颜色
    background-color: $primary-color;
    transform-origin: bottom;
    border-radius: 5px 5px 0 0;
}



.box div:nth-child(1) {
    left: -60px;
    animation: musicWave 0.5s infinite linear both alternate;
}

.box div:nth-child(2) {
    left: -40px;
    animation: musicWave 0.8s infinite linear both alternate;
}

.box div:nth-child(3) {
    left: -20px;
    animation: musicWave 0.6s infinite linear both alternate;
}

.box div:nth-child(4) {
    left: 0px;
    animation: musicWave 0.7s infinite linear both alternate;
}

.box div:nth-child(5) {
    left: 20px;
    animation: musicWave 0.7s infinite linear both alternate;
}

.box div:nth-child(6) {
    left: 40px;
    animation: musicWave 0.6s infinite linear both alternate;
}

.box div:nth-child(7) {
    left: 60px;
    animation: musicWave 0.8s infinite linear both alternate;
}

.box div:nth-child(8) {
    left: 80px;
    animation: musicWave 0.5s infinite linear both alternate;
}

@keyframes musicWave {
    0% {
        height: 8px;
    }

    100% {
        height: 30px;
    }
}

.stop {
    float: left;
    margin-top: 20px;
    margin-left: 50px;
}

.startRecord {
    background: $primary-color;
    color: white;
}
</style>