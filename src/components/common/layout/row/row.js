export default {
   name: 'Row',

   componentName: 'Row',

   props: {

       // 栅格间隔
       gutter: Number,

       // 布局模式，可设置flex 用来启用flex布局
       type: String,

        // flex布局下的水平排列方式：start,center,end,space-between,space-around
       justify: {
           type: String,
           default: 'start'
       },

        // flex布局下的垂直排列方式：top,middle,bottom
       align: {
           type: String,
           default: 'top'
       },

        // 自定义元素标签
       tag: {
           type: String,
           default: 'div'
       }
   },

   computed: {
       style () {
           let ret = {};

           if (this.gutter) {
               ret.marginLeft = `-${this.gutter / 2}px`;
               ret.marginRight = ret.marginLeft;
           }

           return ret;
       }
   },

    render (h) {
        return h(this.tag, {
            class: [
                'row',
                this.justify !== 'start' ? `is-justify-${this.justify}` : '',
                this.align !== 'top' ? `is-align-${this.align}` : '',
                {'row--flex': this.type === 'flex'}
            ],
            style: this.style
        }, this.$slots.default);
    }
};
