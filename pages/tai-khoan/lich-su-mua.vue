<template>
  <div class="container mx-auto w-8/12 grid px-20 grid-cols-4 mt-10">
    <div class="col-span-1">

      <!-- <div class="w-48 h-auto border border-solid border-gray-200 rounded-lg">
        <img class="ml-6 mt-2 rounded-full w-36" src="https://th.bing.com/th/id/OIP.sv0AyRSdUVI72wlCMqYQ3gAAAA?pid=ImgDet&rs=1" alt="image description">

        <a-button class="bg-purple-500 h-10 hover:bg-purple-700 text-white font-medium ml-12 mt-10 mb-2  py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="file">Logout</a-button>
      </div> -->

      <div class="w-60 text-gray-900 bg-white border border-gray-200">
        <nuxt-link to="/tai-khoan/thong-tin">
          <div
            class="py-5 uppercase relative inline-flex items-center rounded-t-lg w-full px-4 text-sm font-medium divide-y divide-slate-200 border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
              viewBox="0 0 20 20">
              <path
                d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
            </svg>
            Thông tin cá nhân
          </div>
        </nuxt-link>
        <nuxt-link to="/tai-khoan/lich-su-mua">
          <div type="button"
            class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
            <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25" />
            </svg>
            Lịch sử mua
          </div>
        </nuxt-link>
        <div type="button"
          class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
          <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18"
            fill="currentColor">
            <path
              d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
              fill="currentColor" />
            <path
              d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
              fill="currentColor" />
          </svg>
          Địa chỉ
        </div>
        <div type="button"
          class="py-5 uppercase relative inline-flex items-center w-full px-4 py-2 text-sm rounded-b-lg font-medium border-solid border  border-gray-200 hover:bg-blue-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700">
          <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 20 20">
            <path
              d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z" />
            <path
              d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" />
          </svg>
          Đăng xuất
        </div>
      </div>
    </div>
    <div class="col-span-3 border border-gray-300 border-solid p-4 h-auto rounded-lg">
      <h1 class="font-600 uppercase">Lịch sử mua hàng</h1>
      <a-space direction="vertical" class="bg-white mb-[15px] w-full px-[10px] pt-[20px]">
        <a-segmented @change="onchangeOrderStatus" v-model:value="orderFilter.status" :options="orderStatuses">
          <template #label="{ label }">
            <div>{{ label }}</div>
          </template>
        </a-segmented>
      </a-space>
      <a-table bordered class="mt-5" :columns="tblConfig.columns" :dataSource="tblData" :pagination="tblPagination"
        :scroll="{ x: 1400 }" @change="onTblChange">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'maDonHang'">
            #{{ text }}
          </template>

          <template v-else-if="column.dataIndex === 'tenNguoiNhan'">
            {{ record.diaChi?.tenNguoiNhan }}
          </template>
          <template v-else-if="column.dataIndex === 'ngayTao'">
            {{ text }}
          </template>
          <template v-else-if="column.dataIndex === 'diaChiEntity'">
            {{ text.diaChi }}
          </template>

          <template v-else-if="column.dataIndex === 'tongTienGiamGia'">
            {{ formatCurrency(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'tongGiaCuoiCung'">
            {{ formatCurrency(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'trangThai'">
            <a-tag :color="getOrderStatusColor(text)">
              {{ text }}
            </a-tag>
          </template>

          <!-- <template v-else-if="column.dataIndex === 'status'">
          <a-tag :color="getOrderStatusColor(text)">
            {{ text }}
          </a-tag>
        </template> -->

          <template v-else-if="column.dataIndex === 'action'">
            <div class="flex gap-[10px] items-left justify-start">
              <a>
                <a-tooltip> <a-button type="default" title="Chi tiết" @click="showModal(record.id)">Chi tiết</a-button>
                 
                  <a-button type="default" class="ml-1" title="Hủy đơn" v-if="record.trangThai == 'WAITING_CONFIRM'">
                  Hủy đơn
                  </a-button>
                  <a-button @click="showModal1(record.id)" title="Đánh giá" type="default" class="ml-1"
                    v-if="record.trangThai == 'COMPLETED'">
                    Đánh giá
                  </a-button>
                  <a-modal title="Đánh giá chi tiết" width="900px" :footer="null" v-model:open="open">
                    <div class="flex flex-col items-end justify-center">
                      <a-table bordered :pagination="false" :columns="tblModalRate.columns"
                        :dataSource="selectedRecord.chiTietDonHang" @change="onTblChange">
                        <template #bodyCell="{ column, text, record }">
                          <template v-if="column.dataIndex === 'id'">
                            #{{ text }}
                          </template>
                          <template v-else-if="column.dataIndex === 'giaTien'">
                            {{ text }}
                          </template>
                          <template v-else-if="column.dataIndex === 'sanPham'">
                            {{ text.tieuDe }}
                          </template>
                          <template v-else-if="column.dataIndex === 'sanPham.anhChinh'">
                            <a-image :width="100" :src="record.sanPham.anhChinh.url" />
                          </template>
                          <template v-else-if="column.dataIndex === 'motaPhanLoai'">
                            {{ text }}
                          </template>
                          <template v-else-if="column.dataIndex === 'rating'">
                            <a-rate @change="rateStar" v-model:value="record.rating" />
                            {{ record.rating }}
                          </template>
                          <template v-else-if="column.dataIndex === 'comment'">
                            <a-form-item :name="'record.comment[' + record.id + ']'">
                              <a-textarea v-model:value="record.comment" :auto-size="{ minRows: 3, maxRows: 5 }"
                                placeholder="Nhập bình luận ..." @input="handleCommentInput(record)"></a-textarea>
                              <a-form-explain class="text-red-500" v-if="showCommentError(record)">Hãy nhập bình
                                luận!</a-form-explain>
                            </a-form-item>
                          </template>
                        </template>
                      </a-table>
                      <a-button type="primary" class="mt-5" :loading="iconLoading" v-if="!daDanhGia" @click="handleOk"  >Đánh giá</a-button>
                    </div>
                  </a-modal>


                  <a-modal v-model:open="visible" width="900px" :footer="null" title="Đơn hàng chi tiết">
                    <a-table bordered :pagination="false" :columns="tblModal.columns" :scroll="{ x: 700 }"
                      :dataSource="selectedRecord.chiTietDonHang" @change="onTblChange">
                      <template #bodyCell="{ column, text, record }">
                        <template v-if="column.dataIndex === 'giaTien'">
                          {{ formatCurrency(text) }}
                        </template>

                        <template v-else-if="column.dataIndex === 'soLuong'">
                          {{ text }}
                        </template>
                        <template v-else-if="column.dataIndex === 'sanPham'">
                          {{ text.tieuDe }}
                        </template>
                        <template v-else-if="column.dataIndex === 'sanPham.anhChinh'">
                          <a-image :width="100" :src="record.sanPham.anhChinh.url" />
                        </template>
                        <template v-else-if="column.dataIndex === 'motaPhanLoai'">
                          {{ text }}
                        </template>
                      </template>
                    </a-table>
                  </a-modal>
                </a-tooltip>
              </a>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { orderUserService } from "../../services/OrderUser";
import ETrangThaiDonHang from "./IDonHangStatus";
import { danhGiaService} from "../../services/DanhGiaService"
import { reactive, ref } from 'vue';
const selectedRecord = ref(null);


const tblConfig = {
  columns: [
    {
      title: "Mã Đơn Hàng",
      dataIndex: "maDonHang",
      key: "maDonHang",
      align: "center",
      width: 130,
    },
    {
      title: "Tổng tiền",
      dataIndex: "tongGiaCuoiCung",
      key: "tongGiaCuoiCung",
      align: "center",
      width: 120,
    },
    {
      title: "HT Thanh toán",
      dataIndex: "phuongThucTT",
      key: "phuongThucTT",
      align: "center",
      width: 100,
    },
    {
      title: "Trạng Thái",
      dataIndex: "trangThai",
      key: "trangThai",
      align: "center",
      width: 150,
    },
    {
      title: "Ngày Đặt",
      dataIndex: "ngayTao",
      key: "ngayTao",
      align: "center",
      width: 170,
    },
    {
      title: "Địa chỉ nhận hàng",
      dataIndex: "diaChiEntity",
      key: "diaChiEntity",
      align: "center",
      width: 300,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      key: "action",
      align: "center",
      fixed: 'right',
      width: 170,
    },
  ],
};
const tblModal = {
  columns: [
    // {
    //   title: "Mã Đơn Hàng",
    //   dataIndex: "id",
    //   key: "id",
    //   align: "center",
    // },
    {
      title: "Ảnh sản phẩm",
      dataIndex: "sanPham.anhChinh",
      key: "sanPham.anhChinh",
      align: "center",
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      align: "center",
    },
   
    {
      title: "Giá Tiền",
      dataIndex: "giaTien",
      key: "giaTien",
      align: "center",
    },
    {
      title: "Số lượng",
      dataIndex: "soLuong",
      key: "soLuong",
      align: "center",
    },   
    {
      title: "Size",
      dataIndex: "motaPhanLoai",
      key: "motaPhanLoai",
      align: "center",
    },
  ],
};
const tblModalRate = {
  columns: [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "sanPham.anhChinh",
      key: "sanPham.anhChinh",
      align: "center",
    },
    {
      title: "Sản phẩm",
      dataIndex: "sanPham",
      key: "sanPham",
      align: "center",
    },

    {
      title: "Size",
      dataIndex: "motaPhanLoai",
      key: "motaPhanLoai",
      align: "center",
    },
    {
      title: "Bình luận",
      dataIndex: "comment",
      key: "comment",
      align: "center",
      width: 200
    },
    {
      title: "Đánh giá",
      dataIndex: "rating",
      key: "rating",
      align: "center",
      width: 200
    },
  ],
};

const orderStatuses = reactive([
  {
    label: "Tất cả",
    value: 'ALL',
  },
  {
    label: "Chờ Xác Nhận",
    value: "WAITING_CONFIRM",
  },
  {
    label: "Đã Thanh Toán",
    value: "VNPAY_PAID",
  },
  {
    label: "Đang vận chuyển",
    value: "DELIVERING",
  },
  {
    label: "Hoàn tất",
    value: "COMPLETED",
  },
  {
    label: "Hoàn trả",
    value: "PHONE_RETURNED",
  },
]);
const getOrderStatusColor = (val: string) => {
  switch (val) {
    case "WAITING_CONFIRM":
      return "gray";
    case "WAITING_PAYMENT":
      return "#f0ad4e";
    case "DELIVERING":
      return "#5bc0de";
    case "COMPLETED":
      return "#5cb85c";
    default:
      return "gray";
  }
};



const tblData = ref([]);
const visible = ref<boolean>(false);
const open = ref<boolean>(false);

const tblPagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
});
const onTblChange = ({ current }: { current: number }, status) => {
  tblPagination.current = current;
  LichSuMua(status);
};
const sanPhamTieuDeList = ref([]);
const showModal = (id) => {
  const record = tblData.value.find((item) => item.id === id);
  orderUserService.chiTietOrder(id).then(res => {
    console.log('res', res.data);
    selectedRecord.value = res.data;
    sanPhamTieuDeList.value = res.data.chiTietDonHang.map(item => item.sanPham.tieuDe);
    console.log('sanPhamTieuDeList', sanPhamTieuDeList.value);
    visible.value = true;
  });
  if (record) {
    selectedRecord.value = record;
    visible.value = true;
  }
};
const daDanhGia = ref(false);
interface DelayLoading {
  delay: number;
}
const iconLoading = ref<boolean | DelayLoading>(false);
const showModal1 = (id) => {
  const record = tblData.value.find((item) => item.id === id);
  orderUserService.chiTietOrder(id).then(res => {
    console.log('Đánh giá111', res.data);
    selectedRecord.value = res.data;
    sanPhamTieuDeList.value = res.data.chiTietDonHang.map(item => item.sanPham.tieuDe);
    const id = res.data.chiTietDonHang.map(item => item.id);
    console.log('id chi tiết', id);
    danhGiaService.find(id).then(res => {
      console.log('Đánh giá', res.data);
      selectedRecord.value.chiTietDonHang.forEach((record, index) => {
        record.rating = res.data[index].soSao;
        record.comment = res.data[index].binhLuan;
      });
      daDanhGia.value = true;
      console.log('selectedRecord', selectedRecord.value);
      open.value = true;
    });
  });
  if (record) {
    selectedRecord.value = record;
    open.value = true;
  }
}

const handleOk = (e: MouseEvent) => {
  if (selectedRecord && selectedRecord) {
    let allCommentsValid = true;
    let formComment = []; // Tạo một mảng để lưu trữ các đối tượng formComment.

    selectedRecord.value.chiTietDonHang.forEach((record) => {
      const singleFormComment = {
        donHangChiTietId: record.id,
        binhLuan: record.comment,
        soSao: record.rating,
      };
      formComment.push(singleFormComment); // Thêm đối tượng formComment vào mảng formComment.
      // Kiểm tra validate của comment ở đây
      if (!isValidComment(record.comment)) {
        allCommentsValid = false;
        // console.error('Comment không hợp lệ: ' + record.id);
        message.warning('Vui lòng nhập hết bình luận !');
      }
    });

    if (allCommentsValid) {
      // Thực hiện xử lý khi tất cả các comment hợp lệ
      console.log('Tất cả comment hợp lệ.');
      console.log('formComment', formComment); // Log formComment sau khi đã xử lý hết các dòng.
      if(formComment.soSao == 0 || formComment.soSao == undefined || formComment.soSao == null){
      message.warning('Vui lòng đánh giá sao !');
    }else
      if (!daDanhGia.value) {
        // Nếu chưa đánh giá thì thực hiện lưu đánh giá
        danhGiaService.create(formComment).then(res => {
          console.log('res', res.data);
          iconLoading.value = true;
          message.success('Đánh giá thành công');
          setTimeout(() => {
            open.value = false;
            iconLoading.value = false;
          }, 1000);
        });
      }
    }
   
     else {
      // Hiển thị thông báo cảnh báo cho người dùng
      message.warning('Có comment không hợp lệ. Vui lòng kiểm tra lại.');
    }
  } else {
    console.error('Không tìm thấy dữ liệu.');
  }
  visible.value = false;
};

function isValidComment(comment) {
  // Kiểm tra validate của comment ở đây
  return comment && comment.trim() !== '';
}


const LichSuMua = (status) => {
  if (status === 'ALL') {
    status = '';
  }
  orderUserService.lichSuMua(status).then(res => {
    console.log(res.data);
    tblData.value = res.data.content;
  });
}
const onchangeOrderStatus = (status) => {
  orderFilter.status = status;
  console.log('status', status);
  LichSuMua(status);
}
const rating = ref(0);
const rateStar = (userRating) => {
  console.log('value', userRating);
  rating.value = userRating;
  console.log('rating', rating);
}

const handleCommentInput = (record) => {
  record.error = !record.comment;
};
const showCommentError = (record) => {
  return record.error;
};
onMounted(() => {
  orderFilter.status = 'ALL'; // Đặt trạng thái mặc định là "Tất cả" khi trang được tải.
  LichSuMua(orderFilter.status); // Gọi hàm LichSuMua để hiển thị danh sách đơn hàng ban đầu.
});
const orderFilter = reactive<{
  status: ETrangThaiDonHang;

}>({
  status: 'ALL',
});
const formatCurrency = (amount) => {
      if (!amount) {
        return '0 VND'; // Mặc định nếu giá trị không tồn tại
      }

      const number = parseFloat(amount);
      if (isNaN(number)) {
        return 'Không hợp lệ'; // Nếu không thể chuyển đổi thành số
      }

      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
      }).format(number);
    }
</script>