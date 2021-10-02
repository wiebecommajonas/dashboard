<template>
	<!-- <n-grid>
    <n-gi span="24">
      <n-grid cols="5">
        <n-gi offset="1" span="3">
          <h3>{{ city }}</h3>
        </n-gi>
      </n-grid>
    </n-gi>
    <n-gi span="24">
      <n-grid cols="7">
        <n-gi offset="1" span="5">
          <p>{{ weather.main.temp }} °C</p>
        </n-gi>
      </n-grid>
    </n-gi>
  </n-grid> -->
	<n-layout>
		<n-layout-header>
			<n-h3>{{ city }}</n-h3>
		</n-layout-header>
		<n-layout-content>
			<n-grid cols="9">
				<n-gi offset="2" span="5">
					<n-grid cols="2">
						<n-gi class="label">
							<n-p>Jetzt:</n-p>
						</n-gi>
						<n-gi class="item">
							<n-p>
								{{ weather.main ? weather.main.temp : "" }}
							</n-p>
						</n-gi>
						<n-gi class="label">
							<n-p>Gefühlt:</n-p>
						</n-gi>
						<n-gi class="item">
							<n-p>
								{{ weather.main ? weather.main.feels_like : "" }}
							</n-p>
						</n-gi>
					</n-grid>
				</n-gi>
			</n-grid>
		</n-layout-content>
	</n-layout>
</template>

<script lang="ts">
import useOwm from "../../plugins/OpenWeatherMap";
import { defineComponent, onMounted } from "@vue/runtime-core";
import userService from "../../plugins/services/UserService";

export default defineComponent({
	name: "WeatherWidget",
	setup() {
		const { currentWeather: weather, city } = useOwm();

		onMounted(async () => {
			const res = await userService.login("jnw@mail.com", "pass");
			console.log(res);
		});

		return { weather, city };
	},
});
</script>

<style scoped>
.item {
	text-align: left;
}

.label {
	text-align: right;
}

.item,
.label {
	padding: 2px;
}
</style>
