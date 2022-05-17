<template>
    <HeaderComponent />
    <div style=" padding: 20px;">
        <a-row :gutter="16">
            <a-col :span="6">
                <a-card title="Card title" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Card title" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Card title" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
            <a-col :span="6">
                <a-card title="Card title" :bordered="false">
                    <p>card content</p>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>
<script>
import HeaderComponent from "./HeaderComponent.vue";
export default ({
    components: {
        HeaderComponent
    }
}
)
</script>