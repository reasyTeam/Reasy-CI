<template>
  <div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      plain
      class="codebtn"
      close
      @click="codedDialogVisible = true"
    >点击配置{{option.valueType}}</el-button>

    <el-dialog :title="title" :visible.sync="codedDialogVisible" width="600px">
      <codemirror v-model="code" :options="cmOptions"></codemirror>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";
// language
import "codemirror/mode/javascript/javascript.js";
// theme css
import "codemirror/theme/neo.css";
// require active-line.js
import "codemirror/addon/selection/active-line.js";
// styleSelectedText
import "codemirror/addon/selection/mark-selection.js";
import "codemirror/addon/search/searchcursor.js";
// hint
import "codemirror/addon/hint/show-hint.js";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint.js";
import "codemirror/addon/selection/active-line.js";
// highlightSelectionMatches
import "codemirror/addon/scroll/annotatescrollbar.js";
import "codemirror/addon/search/matchesonscrollbar.js";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/match-highlighter.js";
// keyMap
import "codemirror/mode/clike/clike.js";
import "codemirror/addon/edit/matchbrackets.js";
import "codemirror/addon/comment/comment.js";
import "codemirror/addon/dialog/dialog.js";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/search/searchcursor.js";
import "codemirror/addon/search/search.js";
import "codemirror/keymap/sublime.js";
// foldGutter
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/brace-fold.js";
import "codemirror/addon/fold/comment-fold.js";
import "codemirror/addon/fold/foldcode.js";
import "codemirror/addon/fold/foldgutter.js";
import "codemirror/addon/fold/indent-fold.js";
import "codemirror/addon/fold/markdown-fold.js";
import "codemirror/addon/fold/xml-fold.js";

export default {
  data() {
    this.startCode = "";
    return {
      codedDialogVisible: false,
      code: "",
      cmOptions: {
        tabSize: 4,
        styleActiveLine: false,
        lineNumbers: true,
        styleSelectedText: false,
        line: true,
        foldGutter: true,
        gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        highlightSelectionMatches: { showToken: /\w/, annotateScrollbar: true },
        mode: "text/javascript",
        // hint.js options
        hintOptions: {
          // 当匹配只有一项的时候是否自动补全
          completeSingle: false
        },
        //快捷键 可提供三种模式 sublime、emacs、vim
        keyMap: "sublime",
        matchBrackets: true,
        showCursorWhenSelecting: true,
        extraKeys: { Ctrl: "autocomplete" }
      }
    };
  },
  props: ["value", "option"],
  computed: {
    title() {
      return `配置[${this.option.title}][${this.option.valueType}]`;
    }
    // defaultCode() {}
  },
  components: {
    codemirror
  },
  methods: {
    setValue() {
      this.$emit("setValue", this.code);
    },
    submit() {
      this.startCode = this.code;
      this.$emit("setValue", this.code);
      this.codedDialogVisible = false;
    },
    cancel() {
      // 总是保存当前的输入
      //   this.code = this.startCode;
      this.codedDialogVisible = false;
    }
  },
  mounted() {
    if (this.value) {
      this.code = this.value;
      this.startCode = this.code;
      return;
    }
    if (this.option.valueType === "object") {
      this.code = `{
    // 在此输入你的配置项
}`;
    } else {
      this.code = `function(){
    // 在此输入你的回调，同时可以添加参数
}`;
    }
    this.startCode = this.code;
  }
};
</script>

<style scoped>
.cm-matchhighlight {
  background-color: lightgreen;
}
.CodeMirror-selection-highlight-scrollbar {
  background-color: green;
}

.codebtn {
  width: 100%;
}
</style>