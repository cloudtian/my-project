export default {
   name: 'row',

   props: {

       // 栅格占据的列数
       span: {
           type: Number,
           default: 24
       },

       // 栅格左侧的间隔格数
       offset: Number,

       // 栅格向右移动格数
       push: Number,

       // 栅格向左移动格数
       pull: Number,

       // <768px 响应式栅格数或者栅格属性对象
       xs: [Number, Object],

        // ≥768px 响应式栅格数或者栅格属性对象
       sm: [Number, Object],

        // ≥992px 响应式栅格数或者栅格属性对象
       md: [Number, Object],

        // ≥1200px 响应式栅格数或者栅格属性对象
       lg: [Number, Object],

        // ≥1920px 响应式栅格数或者栅格属性对象
       xl: [Number, Object],

        // 自定义元素标签
       tag: {
           type: String,
           default: 'div'
       }
   },

   computed: {
       gutter () {
           let parent = this.$parent;

           while (parent && parent.$options.componetName !== 'Row') {
               parent = parent.$parent;
           }

           return parent ? parent.gutter : 0;
       }
   },

   render (h) {
       let classList = [];
       let style = {};

       if (this.gutter) {
           style.paddingLeft =  `${this.gutter / 2}px`;
           style.paddingRight = style.paddingLeft;
       }

       ['span', 'offset', 'pull', 'push'].forEach(prop => {
           if (this[prop] || this[prop] === 0) {
               classList.push(
                   prop !== 'span' ?
                   `el-col-${prop}-${this[prop]}` :
                   `col-${this[prop]}`
               );
           }
       });

       ['xs', 'sm', 'md', 'lg', 'xl'].forEach(size => {
            if (typeof this[size] === 'number') {
                classList.push(`el-col-${size}-${this[size]}`);
            } else if (typeof this[size] === object) {
                let props = this[size];
                Object.keys(props).forEach(prop => {
                    classList.push(
                    prop !== 'span' ?
                    `col-${size}-${prop}-${props[prop]}` :
                    `col-${size}-${props[prop]}`
                    );
                });
            }
        });

        return h(this.tag, {
            class: [
                'col',
                classList
            ],
            style
        }, this.$slots.default)

   }
};
