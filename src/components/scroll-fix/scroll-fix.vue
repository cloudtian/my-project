<template>
    <div class="sf-scroll-fix-box">
        <div ref="scrollFix" style="z-index:1">
            <slot></slot>
        </div>
        <div v-if="!noPlaceHolder && isFixed" :style="{'height': holderElHeight + 'px'}"></div>
    </div>
</template>

<script>
/**
 * @file 滚动到固定位置后定位
 * 当用户向上或向下滚动页面到一定位置时，目标元素开始固定定位（position:fixed）
 * 当回滚到原位置时目标元素恢复到原状态，可以定制触发滚动相对屏幕位置和触发滚动方向
 */

import $ from 'jquery';
import {throttle} from 'common/util/Delay';

// 当前页面fixed元素的个数
let hasFixedCnt = 0;

// 滚动条的宽度
const SCROLL_WIDTH = 17;

export default {
    name: 'SfScrollFix',

    componentName: 'SfScrollFix',

    template: '',

    props: {

        // 当目标元素到了屏幕相对的位置时开始触发固定，可以为数值，负值表示相对于屏幕下方
        top: {
            type: [String, Number],
            'default': 'top'
        },

        // 表示触发固定的滚动方向，top表示从上向下滚动时触发，bottom表示从下向上滚动时触发
        dir: {
            type: String,
            'default': 'top'
        },

        // 滚动时是否生成占位元素，防止其他向上位置，默认需要placeholder
        noPlaceHolder: {
            type: Boolean,
            'default': false
        },

        /**
         * 占位符高度
         * (一般情况不需要配置，页面初始化时目标元素还未加载在dom中时才需要配置)
         */
        holderHeight: {
            type: Number,
            'default': 0
        },

        /**
         * 固定元素距离顶部的高度
         * (一般情况不需要配置，页面初始化时目标元素还未加载在dom中时需配置一个初始值
         * 当页面滚动的时候会重新计算当前正确的值)
         */
        offsetTop: {
            type: Number,
            'default': 0
        }
    },

    computed: {
        height () {
            if (this.top === 'top') {
                return 0;
            }
            if (this.top === 'bottom') {
                return document.documentElement.clientHeight - this.scrollHeight;
            }
            if (Number(this.top) < 0) {
                return document.documentElement.clientHeight - this.scrollHeight + Number(this.top);
            }
            return Number(this.top);
        },
        direct () {
            return this.dir === 'top' ? 1 : -1;
        },
        holderElHeight () {
            return  this.$el.clientHeight || 0;
        }
    },

    data () {
        return {
            isFixed: false
        };
    },

    mounted: function () {
        this.__init();
    },

    methods: {
        __init: function () {
            let $this = $(this.$refs.scrollFix),
                originHeight = false;

            this.scrollHeight = ($this.offset().top || this.offsetTop) - this.height;

            function getScrollTop () {
                return document.documentElement.scrollTop || document.body.scrollTop;
            }

            function getScrollLeft () {
                return document.documentElement.scrollLeft || document.body.scrollLeft;
            }

            let getScrollHeight = () => {

                /**
                 * 如果不是fixed状态，且无其他的已固定的元素，则更新scrollHeight的值
                 * 由于offset是动态计算的，如果当前页面有已经固定的元素，会导致计算不准，此时就不需要更新scrollHeight了
                 */
                if (!this.isFixed && !hasFixedCnt) {
                    this.scrollHeight = ($this.offset().top || this.offsetTop) - this.height;
                }

                return this.scrollHeight;
            };

            $(window).scroll(() => {
                let scrollTop = getScrollTop(),
                    scrollHeight = getScrollHeight(),
                    height = scrollTop - scrollHeight;

                if (typeof this.originLeft === 'undefined' || !this.isFixed) {
                    this.originLeft = $this.offset().left;
                }

                // 如果当前页面在视野中看不见直接return（如：被cover-window遮住了）
                if (!$this.is(':visible')) {
                    return;
                }

                if (originHeight === false) {
                    if ((height >= 0 && this.direct > 0) || (height <= 0 && this.direct < 0)) {
                        originHeight = scrollHeight;
                        $this.css({
                            position: 'fixed',
                            top: this.height,
                            left: this.originLeft
                        });
                        this.isFixed = true;
                        hasFixedCnt++;
                    }
                } else {
                    if ((this.direct > 0 && scrollTop < originHeight) ||
                        (this.direct < 0 && scrollTop > originHeight)) {
                        $this.css({position: 'static'});
                        originHeight = false;
                        this.isFixed = false;
                        hasFixedCnt--;
                    }
                }

                // fix时 水平滚动时也需要相应的修改left
                if (this.isFixed) {
                    $this.css({
                        left: this.originLeft - getScrollLeft()
                    });
                }

                this.$emit('scroll', this.isFixed, scrollTop, scrollHeight);
            });

            $(window).resize(throttle(() => {
                let scrollLeft = getScrollLeft();
                if (this.isFixed) {
                    $this.css({
                        left: scrollLeft <= SCROLL_WIDTH ? 'auto' : this.originLeft - scrollLeft
                    });

                    if (scrollLeft <= SCROLL_WIDTH) {
                        this.originLeft = $this.offset().left;
                    }
                }
            }));
        }
    }
};
</script>

