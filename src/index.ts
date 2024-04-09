import ChessboardVue from "./components/ChessboardVue.vue";

const ChessboardVueComponent = {
    install(Vue: any) {
        Vue.component('ChessboardVue', ChessboardVue);
    }
}

export default ChessboardVueComponent;
