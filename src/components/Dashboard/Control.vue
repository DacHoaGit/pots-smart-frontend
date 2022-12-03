<template>
    <a-card title="Điều khiển hệ thống" style="width: 100"></a-card>
    <div class="row">
      <div class="col-sm-3 col-6 ">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Điều khiển bơm"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
                <button @click="bom" class="btn-control" :class="statusbom ? 'btn-pump-on' : 'btn-pump-off'" type="button">{{statusbom ? 'Bật bơm' : 'Tắt bơm'}}</button>
            </div> 
          </div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Điều khiển đèn"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
                <button @click="den" class="btn-control" :class="statusden ? 'btn-led-on' : 'btn-led-off'" type="button">{{statusden ? 'Bật đèn' : 'Tắt đèn'}}</button>
            </div> 
          </div>
        </a-card>
      </div>

      <div class="col-sm-3 col-6">
        <a-card
          class="mt-2 rounded border border-danger"
          :hoverable="true"
          title="Điều khiển tự động"
          :bordered="true"
        >
          <div class="d-flex justify-content-center align-items-center">
            <div class="d-flex justify-content-center" style="font-size: 30px">
                <button @click="auto" class="btn-control" :class="statusauto ? 'btn-auto-on' : 'btn-auto-off'" type="button">{{statusauto ? 'Bật tự động' : 'Tắt tự động'}}</button>
            </div> 
          </div>
        </a-card>
      </div>
      <div class="col-sm-3 col-6">
      </div>
      <div class="col-12 mt-4 mb-4">
        <a-button
          class="w-xl-25"
          type="primary"
          html-type="submit"
          size="large"
          @click="suggestions"
        >
          <span>Gợi ý đề xuất</span>
        </a-button>
      </div>
      <form class="col-12 d-sm-flex justify-content-between" action="">
        <div class="col-sm-5 col-12">
            <a-divider orientation="center" style="border-color: #7cb305;color:#0c713d">Cấu hình bơm tự động</a-divider>
            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm đất min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm đất min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm đất max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm đất max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm không khí min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm không khí min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm không khí max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm không khí max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Nhiệt độ min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Nhiệt độ min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Nhiệt độ max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Nhiệt độ max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>
        </div>
        <div class="col-sm-5 col-12">
            <a-divider orientation="center" style="border-color: #7cb305;color:#0c713d">Cấu hình đèn tự động</a-divider>
            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm đất min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm đất min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm đất max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm đất max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm không khí min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm không khí min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Độ ẩm không khí max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Độ ẩm không khí max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>

            <div class="row mb-4">
              <div class="col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Nhiệt độ min:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Nhiệt độ min"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
              <div class="col-12 col-sm-3 col-12 col-sm-3 d-sm-flex align-items-center justify-content-end">
                <label>
                  <span>
                    Nhiệt độ max:
                  </span>
                </label>
              </div>
              <div class="col-12 col-sm-3">
                <a-input
                  placeholder="Nhiệt độ max"
                  allow-clear
                />
                <div class="w-100"></div>
              </div>
            </div>
        </div>
      </form>

      

    </div>

</template>

<script setup>
import { useMenu } from "../../stores/menu-store";
import {db,dbt} from "../../configs/firebase";
import { ref as reffb, set, onValue } from "firebase/database";
import { useUserStore } from "../../stores/user-store"
import Swal from "../../sweetalert2";
import {ref} from "vue"

    useMenu().onSelectedKeys(["control"]);
    useMenu().onOpenKeys(["control"]);
    const userStore = useUserStore();
    Swal.showLoading()

    const statusbom = ref(false);
    const bomref =  reffb(db, userStore.token_pots+"/status/bom");
    onValue(bomref, (snapshot) => {
        statusbom.value = snapshot.val();
      Swal.close()
    });

    const statusden = ref(false);
    const denref =  reffb(db, userStore.token_pots+"/status/den");
    onValue(denref, (snapshot) => {
        statusden.value = snapshot.val();
      Swal.close()
    });

    const statusauto = ref(false);
    const autoref =  reffb(db, userStore.token_pots+"/status/auto");
    onValue(autoref, (snapshot) => {
        statusauto.value = snapshot.val();
      Swal.close()
    });

    const bom = async () => {
      Swal.showLoading()
        await set(reffb(db, userStore.token_pots+"/status"), {
          bom : !statusbom.value,
          den : statusden.value,
          auto : statusauto.value,
        });
    }

    const den = async () => {
      Swal.showLoading()
        await set(reffb(db, userStore.token_pots+"/status"), {
          den : !statusden.value,
          bom : statusbom.value,
          auto : statusauto.value,
        });
    }
    
    const auto = async () => {
      Swal.showLoading()
        await set(reffb(db, userStore.token_pots+"/status"), {
          auto : !statusauto.value,
          bom : statusbom.value,
          den : statusden.value,
        });
    }


    const suggestions = async () => {
      suggestion = await Swal.fire({
        title: 'Lựa chọn cây trồng',
        input: 'select',
        inputOptions: {
            apples: 'Táo',
            bananas: 'Cà chua',
            grapes: 'Hoa sữa',
            oranges: 'Cam',
            apples: 'Táo',
            bananas: 'Cà chua1',
            grapewwws: 'Hoa sữa2',
            oranges: 'Cam3',
            appưles: 'Táo',
            bananas: 'Cà chua',
            graưpes: 'Hoa sữa',
            oraưnges: 'Cam',
        },
        inputPlaceholder: 'Lựa chọn cây trồng',
        showCancelButton: true,
      })
    }
    

    
    



</script>

<style scoped>


.btn-control{
    width: 150px;
    height: 150px;
    padding: 10px 16px;
    border-radius: 35px;
    font-size: 24px;
    line-height: 1.33;
    cursor: pointer;
    background-color: #ffffff;
}
.btn-pump-off{
    border-color: rgba(0, 34, 255, 0.885);
    color: rgba(0, 34, 255, 0.885);
}
.btn-pump-on {
    background-color: rgba(0, 34, 255, 0.885);
    color: #fff;
}
.btn-led-off{
    border-color: rgba(255, 0, 149, 0.885);
    color: rgba(255, 0, 149, 0.885);
}
.btn-led-on {
    background-color: rgba(255, 0, 149, 0.885);
    color: #fff;
}
.btn-auto-off{
    border-color: green;
    color: green;
}
.btn-auto-on {
    background-color: green;
    color: #fff;
}
.ant-input-affix-wrapper {
  font-size: 24px;
}
@media only screen and (max-width: 600px) {
    .btn-control{
        width: 100px;
        height: 100px;
        font-size: 12px;
    }
}
</style>