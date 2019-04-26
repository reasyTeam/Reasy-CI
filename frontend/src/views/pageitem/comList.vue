<template>
  <div>
    <section v-for="item in Object.values(components)" :key="item.text">
      <div class="group-title">{{item.text}}</div>
      <draggable
        class="group-box"
        :list="item.list"
        :sortable="false"
        :group="{ name: group, pull: 'clone', put: false }"
        :clone="cloneDog"
        tag="ul"
      >
        <li class="group-item" v-for="element in item.list" :key="element.name">
          <a>{{ element.title }}</a>
        </li>
      </draggable>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import draggable from "vuedraggable";

let idGlobal = 0;
export default {
  props: {
    group: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapGetters("components", {
      components: "components"
    })
  },
  components: {
    draggable
  },
  methods: {
    cloneDog({ name, title }) {
      return {
        id: idGlobal++,
        name,
        title
      };
    }
  }
};
</script>

<style lang="scss" scoped>
$padding-left: 12px;
$padding-top: 8px;

.group-title {
  padding: $padding-top $padding-left;
  font-size: 13px;
}

.group-box {
  padding: 0 $padding-left $padding-top;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
}

.group-item {
  width: 50%;
  text-align: center;
  font-size: 12px;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 2px;
  color: #333;
  box-sizing: border-box;

  a {
    background-color: #f4f6fc;
    display: block;
    cursor: move;
    border: 1px solid #f4f6fc;

    &:hover {
      border: 1px dashed #77bdff;
      color: #0db3a6;
    }
  }
}
</style>

