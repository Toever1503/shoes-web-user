<template>
  <div class="max-w-[1200px] mx-auto grid px-20 grid-cols-4 mt-10">
    <AccountSidebar />
    <div class="col-span-3 border border-gray-300 border-solid p-4 h-auto rounded-lg">
      <h1 class="font-600 uppercase">Lịch sử mua hàng</h1>
      <a-space direction="vertical" class="bg-white w-full">
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
            <!-- {{ dayjs(text).format("DD/MM/YYYY HH:mm:ss") }} -->
            {{ text }}
            {{ dateFormat(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'diaChiEntity'">
            {{ text.diaChi.replaceAll(/__[0-9]+##/g, ", ") }}
          </template>

          <template v-else-if="column.dataIndex === 'tongTienGiamGia'">
            {{ formatCurrency(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'tongGiaCuoiCung'">
            {{ formatCurrency(text) }}
          </template>
          <template v-else-if="column.dataIndex === 'trangThai'">
            <a-tag :color="getOrderStatusColor(text)">
              {{ getLabelOrderStatusByValue(text) }}
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
                <a-tooltip> <a-button type="default" size="small" title="Chi tiết" @click="showModal(record.id)">Chi
                    tiết</a-button>

                  <a-button type="default" size="small" class="ml-1" title="Hủy đơn"
                    v-if="record.trangThai == 'WAITING_CONFIRM'">
                    Hủy đơn
                  </a-button>
                  <a-button @click="showModal1(record.id)" size="small" title="Đánh giá" type="default" class="ml-1"
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
                            <a-rate @change="rateStar" v-model:value="record.rating" :disabled="daDanhGia" />
                            {{ record.rating }}
                          </template>
                          <template v-else-if="column.dataIndex === 'comment'">
                            <a-form-item :name="'record.comment[' + record.id + ']'">
                              <a-textarea v-model:value="record.comment" :auto-size="{ minRows: 3, maxRows: 5 }"
                                :disabled="daDanhGia" placeholder="Nhập bình luận ..."
                                @input="handleCommentInput(record)"></a-textarea>
                              <a-form-explain class="text-red-500" v-if="showCommentError(record)">Hãy nhập bình
                                luận!</a-form-explain>
                            </a-form-item>
                          </template>
                        </template>
                      </a-table>
                      <a-button type="primary" class="mt-5" :loading="iconLoading" v-if="!daDanhGia"
                        @click="handleOk">Đánh giá</a-button>
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
import { ETrangThaiDonHang, getLabelOrderStatusByValue } from "./IDonHangStatus";
import { danhGiaService } from "../../services/DanhGiaService"
import { reactive, ref } from 'vue';
// import dayjs from "dayjs-nuxt"

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
      width: 100,
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

const dateFormat = (ngayTao) => {
  const date = new Date(ngayTao);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

const iconLoading = ref<boolean | DelayLoading>(false);
const showModal1 = (id) => {
  const record = tblData.value.find((item) => item.id === id);
  if (record.checkRate == 1) {
    daDanhGia.value = true;
  } else {
    daDanhGia.value = false;
  }
  console.log('daDanhGia', daDanhGia.value);
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
  if (selectedRecord && selectedRecord.value) {
    let allCommentsValid = true;
    let formComment = [];
    let commentWarningShown = false; // Variable to track whether the warning has been shown
    let ratingWarningShown = false;
    selectedRecord.value.chiTietDonHang.forEach((record) => {
      const singleFormComment = {
        donHangChiTietId: record.id,
        binhLuan: record.comment,
        soSao: record.rating,
      };

      // Kiểm tra validate của comment và rating ở đây
      if (!isValidComment(record.comment)) {
        allCommentsValid = false;
        if (!commentWarningShown) {
          message.warning('Vui lòng nhập hết bình luận !');
          commentWarningShown = true;
        }
      } else if (record.rating === 0 || !isValidRating(record.rating)) {
        allCommentsValid = false;
        if (!ratingWarningShown) {
          message.warning('Vui lòng đánh giá sao từ 1 đến 5 !');
          ratingWarningShown = true;
        }
      } else {
        formComment.push(singleFormComment);
      }
    });

    if (allCommentsValid) {
      console.log('Tất cả comment hợp lệ.');
      console.log('formComment', formComment);

      if (!daDanhGia.value) {
        danhGiaService.create(formComment).then((res) => {
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
    // else {
    //   message.warning('Có comment hoặc đánh giá không hợp lệ. Vui lòng kiểm tra lại.');
    // }
  } else {
    console.error('Không tìm thấy dữ liệu.');
  }
  visible.value = false;
};


// Hàm kiểm tra validate của rating
const isValidRating = (rating) => {
  return rating >= 1 && rating <= 5;
};


function isValidComment(comment) {
  // Kiểm tra validate của comment ở đây
  return comment && comment.trim() !== '';
}

const tblLoading = ref<boolean>(false);

const onTblChange = ({ current }: { current: number }, status) => {
  tblPagination.current = current;
  console.log('current: ', current);
  LichSuMua(status);
};
const LichSuMua = (status) => {
  if (tblLoading.value) return;
  tblLoading.value = true;
  if (status === 'ALL') {
    status = '';
  }
  orderUserService.lichSuMua(status, tblPagination.current - 1,
    tblPagination.pageSize).then(res => {
      ;
      console.log(res.data);
      tblData.value = res.data.content.map((item: any, index: number) => ({
        ...item,
        stt: index + 1,
      }));
      tblPagination.total = res.data.totalElements;
    }).catch((err) => {
      console.log("error: ", err);
    })
    .finally(() => (tblLoading.value = false));
}
const onchangeOrderStatus = (status) => {
  orderFilter.status = status;
  console.log('status', status);
  LichSuMua(status);
}
const rating = ref(3);
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