<template>
    <div class='document-wrapper'>
        <div class='main-container'>
            <!--上一页-->
            <div class='PREV' @click='Prev' v-if='showPrev'>
                <i class='icon-left'></i>
            </div>
            <!--下一页-->
            <div class='NEXT' @click='Next' v-if='showNext'>
                <i class='icon-right'></i>
            </div>
            <!-- 文章列表 -->
            <div class='article-list'>
                <div class='article-item' v-for='(item,index) in articleList' :key='index' @click='goArticleDetail(item)'> 
                    <!-- 标题 -->
                    <div class='title'>
                        {{item.title}}
                        <span class='classification'>
                        {{getClassificationDes(item.classification)}}
                        </span>
                    </div>
                    <!-- 作者 & 发布时间 -->
                    <div class='info'>
                        <span class='name'>{{item.createUserName}}</span>
                        <span class='time'>{{item.date | timeFormat}}</span>
                    </div>
                    <!-- 概要内容 -->
                    <div class='article'>
                        <img class='coverPic' v-if='item.coverPic' :src='global.articleCoverPath + item.coverPic'>
                        <span class='content'>
                            {{item.intro}}
                        </span>
                    </div>
                    <!-- 操作 -->
                    <div class='operation'>
                        <div class='operation-list'>
                            <i class='icon-like' style='margin-right:10px;cursor:pointer;display:flex;align-items:center;' :class="isLike(item) ? 'is-like' : '' " @click.stop='isLike(item) ? cancelLike(item,index) : giveLike(item,index)'><span style='margin-left:5px;font-size:10px;'>{{item.like}}</span></i>
                            <!-- <i class='icon-comment' style='margin-right:10px;cursor:pointer;'></i> -->
                            <i class='icon-delete' style='cursor:pointer;' @click.stop='deleteArticle(item)'></i>
                        </div>
                        <div class='more' style='cursor:pointer;' @click.stop='tiggerOperationAnime(index)'>
                            <i class='icon-more'></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getArticleListById, deletArticleById, postLike, deleteLike, getUserLike } from '../../../Api/api.js'
import anime from 'animejs'
export default {
    name:'Document',
    data(){
        return{
            showOperation:false, // 控制更多按钮是收回 / 展开  当false时点击则展开，当true时点击则为收缩
            // 上下页 按钮配置
            prev:'left',
            next:'right',
            AllartcileList:[], // 文章列表
            articleList:[],  // 当前显示文章列表
            userlikeArray:[],
            page:1, // 当前页数
        }
    },
    mounted(){
        this.getArticleList()
        this.getUserLikeData()
    },
    computed:{
        showPrev(){
            if(this.page <= 1){
                return false
            }else{
                return true
            }
        },
        showNext(){
            if(this.page * 4 < this.AllartcileList.length){
                return true
            }else{
                return false
            }
        },
        isLike(){
            return function (item) {
                for(let i = 0; i < this.userlikeArray.length; i++){
                    if(this.userlikeArray[i].article == item._id){
                        return true
                    }
                }
                return false
            }
        }
    },
    methods:{
        /**
         * 文章操作逻辑
         * @Prev 上一页点击事件
         * @Next 下一页点击事件  
         */
        Prev:function(){
            this.articleList = []
            this.page--
            for(let i = (this.page - 1) * 4; i < this.page * 4; i++){
                if(this.AllartcileList[i]){
                    this.articleList.push(this.AllartcileList[i])
                }
            }
            var el = document.getElementsByClassName('operation-list')
            for(let i = 0; i < el.length; i++){
                console.log()
                el[i].classList.remove('show-Operationlist')
            }
        },
        Next:function(){
            this.articleList = []
            this.page++
            for(let i = (this.page - 1) * 4; i < this.page * 4; i++){
                if(this.AllartcileList[i]){
                    this.articleList.push(this.AllartcileList[i])
                }
            }
            var el = document.getElementsByClassName('operation-list')
            for(let i = 0; i < el.length; i++){
                el[i].classList.remove('show-Operationlist')
            }
        },
        /**
         * 文章操作逻辑
         * @tiggerOperationAnime 触发动画
         * @restoreOperationAnime 复原动画
         * @optionChange 更多图标点击事件  
         */
        tiggerOperationAnime:function(index){
            var el = document.getElementsByClassName('operation-list')[index]
            console.log(el.classList)
            var flag
            for(let i = 0; i < el.classList.length; i++){
                if(el.classList[i] === 'show-Operationlist'){
                    flag = true
                }else{
                    flag = false
                }
            }
            if(flag){
                el.classList.remove('show-Operationlist')
            }else{
                el.classList.add('show-Operationlist')
            }
        },
        /**
         * 根据id获取文章列表
         * @id 创建者id 
         */
        getArticleList:function(){
            var id = JSON.parse(sessionStorage.getItem('currentUserInfo'))._id
            getArticleListById(id).then(res => {
                console.log('getArticleListById:', res.data)
                if(res.data.code == 0){
                    this.AllartcileList = res.data.data
                    this.articleList = []
                    for(let i = (this.page - 1) * 4; i < this.page * 4; i++){
                        if(this.AllartcileList[i]){
                            this.articleList.push(this.AllartcileList[i])
                        }
                    }
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        // 根据classification获取对应分类名  1-随笔   2-新闻   3-知识   4-沸点
        getClassificationDes:function(classification){
            switch(classification){
                case '1':
                    return '随笔'
                    break
                case '2':
                    return '新闻'
                    break
                case '3':
                    return '知识'
                    break
                case '4':
                    return '沸点'
                    break
                default:
                    return ''
            }
        },
        // 删除文章
        deleteArticle(item){
            deletArticleById(item._id).then(res => {
                if(res.data.code == 0){
                    this.page = 1
                    this.getArticleList()
                    var el = document.getElementsByClassName('operation-list')
                    for(let i = 0; i < el.length; i++){
                        el[i].classList.remove('show-Operationlist')
                    }
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        // 跳转详情页
        goArticleDetail:function(item){
            this.$router.push({
                path:'/detail',
                query:{
                    id:item._id
                }
            })
        },
        getUserLikeData:function(){
            var id = JSON.parse(sessionStorage.getItem('currentUserInfo'))._id
            getUserLike(id).then( res => {
                console.log('getUserLike:',res)
                if(res.data.code == 0){
                    this.userlikeArray = res.data.data
                }
            })
        },
        giveLike:function(item,index){
            var data = {
                id:item._id
            }
            postLike(data).then( res => {
                console.log('postLike:',res)
                if(res.data.code == 0){
                    this.articleList[index].like++
                    this.getUserLikeData()
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        },
        cancelLike:function(item, index){
            var data = {
                id:item._id
            }
            deleteLike(data).then( res => {
                console.log('deleteLike:',res)
                if(res.data.code == 0){
                    this.articleList[index].like--
                    this.getUserLikeData()
                }else{
                    this.$notify({
                        title: 'Tips',
                        message: res.data.message,
                        type: 'error',
                        duration:3000
                    })
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
// iconfont
@import '@/iconfont.scss';
.icon-left:before {
    content: '\e744';
    font-size:15px;
}
.icon-right:before {
    content: '\e743';
    font-size:15px;
}
.icon-more:before{
    content: '\eb30';
    font-size:20px;
}
.icon-more{
    transition:all .5s ease;
}
.icon-more:hover {
    color:#5FA8D3;
}
.icon-like:before{
    content: '\e663';
    font-size:15px;
}
.icon-like{
    margin-left:10px;
    transition:all .2s ease;
}
.is-like{
    color:#fc5c65;
}
.icon-like:hover {
    color:#fc5c65;
}
.icon-comment:before{
    content: '\e60c';
    font-size:15px;
}
.icon-comment{
    transition:all .2s ease;
}
.icon-comment:hover {
    color:#20bf6b;
}
.icon-delete:before{
    content: '\e645';
    font-size:15px;
}
.icon-delete{
    transition:all .2s ease;
}
.icon-delete:hover {
    color:#C9D2CA;
}

.document-wrapper {
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    background:#fff;
    .main-container{
        flex:1;
        overflow-Y:auto;
        display: flex;
        position: relative;
        .PREV{
            position: absolute;
            z-index:2;
            top:50%;
            left:10px;
            transform: translateY(-50%);
            padding:5px 5px;
            display: flex;
            justify-content: center;
            align-items:center;
            border-radius:50%;
            color:#fff;
            background: #000;
            opacity: 0.6;
            cursor: pointer;
            transition:all .5s ease;
            &:hover{
                opacity: 1;
            }
        }
        .NEXT{
            position: absolute;
            z-index:2;
            top:50%;
            right:10px;
            transform: translateY(-50%);
            padding:5px 5px;
            display: flex;
            justify-content: center;
            align-items:center;
            border-radius:50%;
            color:#fff;
            background: #000;
            opacity: 0.6;
            cursor: pointer;
            transition:all .5s ease;
            &:hover{
               opacity: 1; 
            }
        }
        .article-list{
            flex:1;
            display: flex;
            flex-direction: column;
            align-items: center;
            .article-item{
                position: relative;
                display: flex;
                flex-direction: column;
                margin:10px 20px;
                border-bottom:1px solid rgba(178,186,194,.15);
                cursor:pointer;
                width:90%;
                transition:all .2s linear;
                &:hover{
                    border-bottom:1px solid rgba(178,186,194,.7);
                }
                &:first-child{
                    margin-top:30px;
                }
                .title{
                    font-size:18px;
                    font-weight:bold;
                    color:#303952;
                    width:400px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow:ellipsis;
                    display:flex;
                    align-items:center;
                    .classification{
                        margin-left:10px;
                        padding:0px 10px;
                        border-left:2px solid rgba(178,186,194,.15);
                        color:#303952;
                        font-size:10px;
                        font-weight:100;
                    }
                }
                .info{
                    margin-top:8px;
                    display: flex;
                    align-items:center;
                    font-size:12px;
                    font-family: 'Microsoft JhengHei',"Open Sans", Helvetica, Arial, sans-serif;
                    .name{
                        color:#303952;
                        margin-right:10px;
                    }
                    .time{
                        color:#A4AEA8;
                    }
                }
                .article{
                    display:flex;
                    margin-top:15px;
                    padding-bottom:20px;
                    .coverPic{
                        margin:0px 20px 0px 0px;
                        width: 100px;
                        height:60px;
                        border-radius:5px;
                    }
                    .content{
                        flex:1;
                        height:60px;
                        font-size:13px;
                        line-height: 25px;
                        color:#303231;
                        overflow: hidden;
                        text-overflow:ellipsis;
                    }
                }
                .operation{
                    position:absolute;
                    top:0px;
                    right:5px;
                    display: flex;
                    align-items: center;
                    .operation-list{
                        display: flex;
                        align-items:center;
                        width:0px;
                        overflow: hidden;
                        opacity:0;
                        transform:scale(0,0);
                        transition:all .3s linear;
                    }
                    .show-Operationlist{
                        opacity:1;
                        width:90px;
                        transform:scale(1,1);
                    }
                }
            }
        }
    }
}
</style>