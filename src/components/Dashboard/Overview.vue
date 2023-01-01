<template>
  <a-card title="Tổng quan" style="width: 100">
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
              <a-progress type="circle" :percent="sensor.nhietdo" :format="percent => `${percent} &deg;C`"/>
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
              <a-progress type="circle" :percent="sensor.doamdat"/>
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
              <a-progress type="circle" :percent="sensor.doamkhongkhi"/>
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
              <a-progress type="circle" :percent="75" :format="percent => `${percent} &deg;C`"/>
            </div>
          </div>
          <div class="text-center">Bình thường</div>
        </a-card>
      </div>
    </div>
    <div class="row"  style="margin-top:50px">
      <line-chart height="500px" :download="true" loading="Loading..." xtitle="Time" :min="0" :max="100" :data="data" />
    </div>
  </a-card>
</template>

<script  setup>
import { useMenu } from "../../stores/menu-store";
import {db,dbt} from "../../configs/firebase";
import { ref,onValue} from "firebase/database";
import { useUserStore } from "../../stores/user-store"

import {
 getFirestore,
 getDoc,
 getDocs,
 updateDoc,
 collection,
 doc
} from '@firebase/firestore';
import { reactive } from "vue";
  const userStore = useUserStore();



  const sensor = reactive({
    nhietdo: 0,
    doamdat: 0,
    doamkhongkhi:0,
    data:[]
    
  });
  const data = [
    {name: 'Nhiệt độ', data: {'2017-01-01 00:00:00 -0800': 3, '2017-01-02 00:00:00 -0800': 4,'2017-01-03 00:00:00 -0800': 6,'2017-01-04 00:00:00 -0800': 9,'2017-01-05 00:00:00 -0800': 22,'2017-01-08 00:00:00 -0800': 21,'2017-01-09 00:00:00 -0800': 16}},
    {name: 'Độ ẩm đất', data: {'2017-01-01 00:00:00 -0800': 5, '2017-01-02 00:00:00 -0800': 3}},
    {name: 'Độ ẩm không khí', data: {'2017-01-01 00:00:00 -0800': 10, '2017-01-02 00:00:00 -0800': 20}},
  ];
 

  const nhietdoref = ref(db, userStore.token_pots+'/sensor/nhietdo');
  onValue(nhietdoref, (snapshot) => {
    if(snapshot.val())
      sensor.nhietdo =snapshot.val();
  });
  const doamdatref = ref(db, userStore.token_pots+'/sensor/doamdat');
  onValue(doamdatref, (snapshot) => {
    if(snapshot.val())
      sensor.doamdat = snapshot.val();
  });
  const doamkhongkhiref = ref(db, userStore.token_pots+'/sensor/doamkhongkhi');
  onValue(doamkhongkhiref, (snapshot) => {
    if(snapshot.val())
      sensor.doamkhongkhi = snapshot.val();
  });

  const getData = async () => {
    const docRef = collection(dbt, "chartdata");
    const docSnap = await getDocs(docRef);
    docSnap.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    });
  }
  
  getData()

useMenu().onSelectedKeys(["dashboard"]);
useMenu().onOpenKeys(["dashboard"]);
</script>
