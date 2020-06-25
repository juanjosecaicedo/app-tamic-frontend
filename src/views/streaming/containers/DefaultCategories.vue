<template>
    <div v-if="category != null">
        <div class="carousel_head">
            <h2 class="category_title">{{category.name}}</h2>
        </div>
        <div class="carousel_items categories">
            <div class="card_item" v-for="item in streaming" :key="item.title">
                <div class="card_img lazyloaded">
                    <button @click="fnt_streaming(item)" type="button" aria-label="Ver" class="play_video">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            width="50" height="50" viewBox="0 0 16 16">
                            <path fill="#ffffff"
                                d="M8 1c3.9 0 7 3.1 7 7s-3.1 7-7 7-7-3.1-7-7 3.1-7 7-7zM8 0c-4.4 0-8 3.6-8 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8v0z" />
                            <path fill="#ffffff" d="M6 4v8l6-4z" />
                        </svg>
                    </button>
                    <b-link @click="fnt_detail(item)" class="card_link">
                        <img v-lazy="item.img_streaming" />
                    </b-link>
                </div>
                <h6 class="card_name default_title">{{item.title}}</h6>
                <rate :value="item.popularity" size="12px" />
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
            category: {
                required: false
            },
            type: {
                required: false
            }
        },
        data: () => {
            return {
                streaming: []
            };
        },
        mounted() {
            this.fnt_validate();
            this.fnt_get_streaming();
        },
        methods: {
            fnt_get_streaming() {
                let identifier = "category-" + this.type;
                if (localStorage.getItem(identifier) == null) {
                    if (this.category != null) {
                        Promise.all([
                            axios.get("streaming/categories/" + this.category.category_id, {
                                params: {
                                    type: this.type
                                }
                            })
                        ]).then(([result]) => {
                            this.streaming = result.data;
                            localStorage.setItem(identifier, JSON.stringify(this.streaming));
                        });
                    }
                } else {
                    this.streaming = JSON.parse(localStorage.getItem(identifier));
                }
            },
            fnt_validate() {
                if (this.category == null || this.category.category_id == null) {
                    this.$router.push({
                        name: "Browse"
                    });
                }
            },
            fnt_streaming(item) {
                if (this.type == "25caf9e6-7023-442f-b2fc-f33230b219e3") {
                    this.fnt_detail(item);
                } else {
                    localStorage.time = 0;
                    if (item.tbl_types_type_id == "9608482c-a6c4-4694-8478-16cb9b59c45e") {
                        axios.get("create/visit/" + item.streaming_id);
                        window.location.href = "http://apptamic.herokuapp.com/watch.html?item=" + item.streaming_id +
                            "&token=" + JSON.parse(localStorage.sessionData).email_footprint
                    } else {
                        this.$router.push({
                            name: "Watch",
                            params: {
                                item: CryptoJS.AES.encrypt(JSON.stringify(item), token).toString()
                            }
                        });
                    }
                }
            },
            fnt_detail(item) {
                localStorage.item = CryptoJS.AES.encrypt(JSON.stringify(item), token).toString();
                this.$router.push({
                    name: "Detail"
                });
            }
        }
    };
</script>