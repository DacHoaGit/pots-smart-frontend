<template>
  <a-card title="Tổng quan" style="width: 100">
    <div class="row mb-2">
      <a-space>
        <select class="d-none" name="" id="">
          <option :key="item.id" v-for="item in devices" :value="item.device">
            {{ item.name }}
          </option>
        </select>
        <a-select
          v-model:value="valueDevice"
          style="width: 200px"
          @change="handleChange"
        >
          <a-select-opt-group>
            <template #label>
              <span>
                <user-outlined />
                My Device
              </span>
            </template>
            <a-select-option
              :key="item.id"
              v-for="item in devices"
              :value="item.device"
            >
              {{ item.name }}</a-select-option
            >
          </a-select-opt-group>

          <a-select-opt-group label="My Shared">
            <template #label>
              <span>
                <user-outlined />
                Device Shared
              </span>
            </template>
            <a-select-option
              :key="item.id"
              v-for="item in shares"
              :value="item.device.device"
            >
              {{ item.device.name }}</a-select-option
            >
          </a-select-opt-group>
        </a-select>
      </a-space>
    </div>
    <div class="row">
      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Nhiệt độ"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <a-progress
                type="circle"
                :percent="sensor.nhietdo"
                :format="(percent) => `${percent} &deg;C`"
              />
            </div>
          </div>
          <div class="text-center">Bình thường</div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Độ ẩm đất"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <a-progress type="circle" :percent="sensor.doamdat" />
            </div>
          </div>
          <div class="text-center">Bình thường</div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Độ ẩm không khí"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <a-progress type="circle" :percent="sensor.doamkhongkhi" />
            </div>
          </div>
          <div class="text-center">Bình thường</div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Ánh sáng"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
              <a-progress
                type="circle"
                :percent="75"
                :format="(percent) => `${percent} &deg;C`"
              />
            </div>
          </div>
          <div class="text-center">Bình thường</div>
        </a-card>
      </div>
    </div>

    <div class="row" style="margin-top: 50px">
      <div class="row">
        <a-space direction="horizontal" :size="13">
          <a-date-picker
            @change="changeDate"
            value-format="YYYY-MM-DD"
            v-model:value="datefrom"
            :disabled-date="disabledDate"
            style="border-color: aqua"
            size="large"
          />
          <a-date-picker
            value-format="YYYY-MM-DD"
            v-model:value="dateto"
            @change="changeDate"
            :disabled-date="disabledDate"
            style="border-color: aqua"
            size="large"
          />
        </a-space>
      </div>
      <line-chart
        height="500px"
        :download="true"
        loading="Loading..."
        xtitle="Time"
        :curve="true"
        :data="data"
        :options="options"
      />
    </div>
  </a-card>
</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import { db, dbt } from "../../configs/firebase";
import { ref, onValue, off } from "firebase/database";
import { useUserStore } from "../../stores/user-store";
import { useDeviceStore } from "../../stores/device-store";
import { useShareStore } from "../../stores/share-store";
import { UserOutlined } from "@ant-design/icons-vue";
import Swal from "../../sweetalert2";
import dayjs from "dayjs";

import { collection, onSnapshot } from "@firebase/firestore";
import { reactive, ref as refv, onMounted } from "vue";

const deviceStore = useDeviceStore();
const shareStore = useShareStore();
const devices = refv({});
const shares = refv({});
const datefrom = refv("");
const dateto = refv(dayjs());

const valueDevice = refv({});
const valueDeviceOld = refv("");
const listDataOld = refv({});
const data = refv({});

const disabledDate = (current) => {
  return current > dayjs();
};
const options = refv({
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          min: "2023-02-01 00:00:00",
          max: "2023-02-05 00:00:00",
        },
      },
    ],
  },
});

const changeDate = () => {
  getData(valueDevice.value,datefrom.value,dateto.value);
};

onMounted(async () => {
  Swal.showLoading();
  await deviceStore.fetchDevicesByUser();
  await shareStore.fetchSharedComfirmList();
  devices.value = deviceStore.devices;
  shares.value = shareStore.shared_comfirm_list;
  if (Object.keys(devices.value).length != 0) {
    valueDevice.value = Object.values(devices.value)[0].device;
    getSensor(valueDevice.value);
    getData(valueDevice.value);
  } else if (Object.keys(shares.value).length != 0) {
    valueDevice.value = Object.values(shares.value)[0].device.device;
    getSensor(valueDevice.value);
    getData(valueDevice.value);
  }

  Swal.close();
});

// const value = ref('');

const handleChange = (value) => {
  Swal.showLoading();

  getSensor(value);
  getData(value);

  Swal.close();
};

const getSensor = (device) => {
  //remove listener old
  const nhietdooldref = ref(db, valueDeviceOld.value + "/sensor/nhietdo");
  off(nhietdooldref);
  const doamdatoldref = ref(db, valueDeviceOld.value + "/sensor/doamdat");
  off(doamdatoldref);
  const doamkhongkhioldref = ref(
    db,
    valueDeviceOld.value + "/sensor/doamkhongkhi"
  );
  off(doamkhongkhioldref);

  //add listener new
  const nhietdoref = ref(db, device + "/sensor/nhietdo");
  onValue(nhietdoref, (snapshot) => {
    if (snapshot.val() || snapshot.val() == 0) sensor.nhietdo = snapshot.val();
  });
  const doamdatref = ref(db, device + "/sensor/doamdat");
  onValue(doamdatref, (snapshot) => {
    if (snapshot.val() || snapshot.val() == 0) sensor.doamdat = snapshot.val();
  });
  const doamkhongkhiref = ref(db, device + "/sensor/doamkhongkhi");
  onValue(doamkhongkhiref, (snapshot) => {
    if (snapshot.val() || snapshot.val() == 0)
      sensor.doamkhongkhi = snapshot.val();
  });

  //store value old
  valueDeviceOld.value = device;
};

const sensor = reactive({
  nhietdo: 0,
  doamdat: 0,
  doamkhongkhi: 0,
  data: [],
});

const getData = async (device, from, to) => {
  try {
    listDataOld.value();
  } catch (error) {}

  const q = collection(dbt, device);
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const listnhietdo = {};
    const listdoamkhongkhi = {};
    const listdoamdat = {};
    querySnapshot.forEach((doc) => {
      //process format datetime
      const timestamp = doc.data().timestamp;
      const d = new Date(timestamp * 1000);
      const datetime = dayjs(d).format("YYYY-MM-DD HH:MM:ss");

      if (from && to) {
        const dateFrom = dayjs(from).format("YYYY-MM-DD 00:00:00");
        const dateTo = dayjs(to).format("YYYY-MM-DD 23:59:59");
          
        if ((dateTo > datetime && dateFrom < datetime ) && doc.data().nhietdo != 0 && doc.data().doamkhongkhi !=0 ) {
          listnhietdo[datetime] = doc.data().nhietdo;
          listdoamdat[datetime] = doc.data().doamdat;
          listdoamkhongkhi[datetime] = doc.data().doamkhongkhi;
        }
      }

      else if ((!dayjs().isBefore(datetime)) && doc.data().nhietdo != 0 && doc.data().doamkhongkhi !=0 ) {
        listnhietdo[datetime] = doc.data().nhietdo;
        listdoamdat[datetime] = doc.data().doamdat;
        listdoamkhongkhi[datetime] = doc.data().doamkhongkhi;
      }
    });

    data.value = [
      {
        name: "Nhiệt độ",
        data: listnhietdo,
      },
      {
        name: "Độ ẩm đất",
        data: listdoamdat,
      },
      {
        name: "Độ ẩm không khí",
        data: listdoamkhongkhi,
      },
    ];
  });
  listDataOld.value = unsubscribe;
};

useMenu().onSelectedKeys(["dashboard"]);
useMenu().onOpenKeys(["dashboard"]);
</script>
