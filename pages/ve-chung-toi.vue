<template>
  <div
    class="fixed top-0 left-0 w-full h-full bg-gray-50 flex justify-center items-center"
  >
    <a-button @click="openOrder">order</a-button>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import PaymentService from "~/services/PaymentService";
var vietnameseNames = [
  "Nguyễn Văn Dương",
  "Trần Thị Hương",
  "Lê Minh Tuấn",
  "Phạm Thị Mai",
  "Hoàng Văn Long",
  "Ngô Thị Bích",
  "Đặng Minh Hải",
  "Vũ Thị Lan",
  "Lý Văn Khánh",
  "Bùi Thị Thu",
  "Trịnh Văn Thắng",
  "Mai Thị Loan",
  "Võ Văn Quân",
  "Đỗ Thị Ngọc",
  "Lương Minh Tiến",
  "Nguyễn Thị Hoa",
  "Trương Văn Hòa",
  "Hoàng Thị Ngân",
  "Phan Văn Hùng",
  "Chu Thị Phương",
  "Nguyễn Văn Hải",
  "Lê Thị Huệ",
  "Phạm Văn Trọng",
  "Ngô Thị Trang",
  "Trần Văn Hưng",
  "Lê Thị Ánh",
  "Vũ Minh Quang",
  "Đặng Thị Thủy",
  "Lê Văn Bình",
  "Phan Thị Ngọc",
  "Nguyễn Minh Tuấn",
  "Hoàng Thị Thảo",
  "Trịnh Văn Thành",
  "Võ Thị Quỳnh",
  "Lý Văn Hòa",
  "Bùi Thị Hương",
  "Đỗ Văn Đức",
  "Mai Thị Hạnh",
  "Trần Văn Lâm",
  "Nguyễn Thị Hồng",
  "Lương Văn Đức",
  "Phạm Thị Trang",
  "Nguyễn Văn Tuấn",
  "Trương Thị Mai",
  "Ngô Văn Hùng",
];
// Function to generate a random single-digit number
function getRandomDigit() {
  return Math.floor(Math.random() * 10);
}

const SP_BT = [
  {
    id: 1,
    gia_moi: 4750000.0,
  },
  {
    id: 2,
    gia_moi: 4750000.0,
  },
  {
    id: 3,
    gia_moi: 4750000.0,
  },
  {
    id: 4,
    gia_moi: 4750000.0,
  },
  {
    id: 5,
    gia_moi: 4750000.0,
  },
  {
    id: 6,
    gia_moi: 4000000.0,
  },
  {
    id: 7,
    gia_moi: 4000000.0,
  },
  {
    id: 8,
    gia_moi: 4000000.0,
  },
  {
    id: 9,
    gia_moi: 3000000.0,
  },
  {
    id: 10,
    gia_moi: 3000000.0,
  },
  {
    id: 11,
    gia_moi: 3000000.0,
  },
  {
    id: 12,
    gia_moi: 4750000.0,
  },
  {
    id: 13,
    gia_moi: 4750000.0,
  },
  {
    id: 14,
    gia_moi: 4750000.0,
  },
  {
    id: 15,
    gia_moi: 1875000.0,
  },
  {
    id: 16,
    gia_moi: 1875000.0,
  },
  {
    id: 17,
    gia_moi: 1875000.0,
  },
  {
    id: 18,
    gia_moi: 4000000.0,
  },
  {
    id: 19,
    gia_moi: 4000000.0,
  },
  {
    id: 20,
    gia_moi: 4000000.0,
  },
  {
    id: 31,
    gia_moi: 1615000.0,
  },
  {
    id: 32,
    gia_moi: 1615000.0,
  },
  {
    id: 33,
    gia_moi: 1615000.0,
  },
  {
    id: 34,
    gia_moi: 1615000.0,
  },
  {
    id: 35,
    gia_moi: 1615000.0,
  },
  {
    id: 36,
    gia_moi: 1615000.0,
  },
  {
    id: 37,
    gia_moi: 1615000.0,
  },
  {
    id: 39,
    gia_moi: 2800000.0,
  },
  {
    id: 40,
    gia_moi: 2800000.0,
  },
  {
    id: 41,
    gia_moi: 2800000.0,
  },
  {
    id: 42,
    gia_moi: 2800000.0,
  },
  {
    id: 43,
    gia_moi: 2800000.0,
  },
  {
    id: 44,
    gia_moi: 4250000.0,
  },
  {
    id: 45,
    gia_moi: 4250000.0,
  },
  {
    id: 46,
    gia_moi: 4250000.0,
  },
  {
    id: 47,
    gia_moi: 4000000.0,
  },
  {
    id: 48,
    gia_moi: 4000000.0,
  },
  {
    id: 49,
    gia_moi: 4000000.0,
  },
  {
    id: 50,
    gia_moi: 4000000.0,
  },
  {
    id: 51,
    gia_moi: 4000000.0,
  },
  {
    id: 52,
    gia_moi: 4000000.0,
  },
  {
    id: 53,
    gia_moi: 4000000.0,
  },
  {
    id: 54,
    gia_moi: 3250000.0,
  },
  {
    id: 55,
    gia_moi: 3250000.0,
  },
  {
    id: 56,
    gia_moi: 3250000.0,
  },
  {
    id: 57,
    gia_moi: 3250000.0,
  },
  {
    id: 58,
    gia_moi: 4500000.0,
  },
  {
    id: 59,
    gia_moi: 4500000.0,
  },
  {
    id: 60,
    gia_moi: 4500000.0,
  },
  {
    id: 61,
    gia_moi: 4500000.0,
  },
  {
    id: 62,
    gia_moi: 4750000.0,
  },
  {
    id: 63,
    gia_moi: 4750000.0,
  },
  {
    id: 64,
    gia_moi: 4750000.0,
  },
  {
    id: 65,
    gia_moi: 1250000.0,
  },
  {
    id: 66,
    gia_moi: 1250000.0,
  },
  {
    id: 67,
    gia_moi: 1250000.0,
  },
  {
    id: 68,
    gia_moi: 1250000.0,
  },
  {
    id: 69,
    gia_moi: 2000000.0,
  },
  {
    id: 70,
    gia_moi: 2000000.0,
  },
  {
    id: 71,
    gia_moi: 2000000.0,
  },
  {
    id: 72,
    gia_moi: 2750000.0,
  },
  {
    id: 73,
    gia_moi: 2750000.0,
  },
  {
    id: 74,
    gia_moi: 2750000.0,
  },
  {
    id: 75,
    gia_moi: 2750000.0,
  },
  {
    id: 76,
    gia_moi: 2100000.0,
  },
  {
    id: 77,
    gia_moi: 2100000.0,
  },
  {
    id: 78,
    gia_moi: 2100000.0,
  },
  {
    id: 79,
    gia_moi: 6250000.0,
  },
  {
    id: 80,
    gia_moi: 6250000.0,
  },
  {
    id: 81,
    gia_moi: 6250000.0,
  },
  {
    id: 82,
    gia_moi: 3000000.0,
  },
  {
    id: 83,
    gia_moi: 3000000.0,
  },
  {
    id: 84,
    gia_moi: 3000000.0,
  },
  {
    id: 85,
    gia_moi: 3000000.0,
  },
  {
    id: 86,
    gia_moi: 4000000.0,
  },
  {
    id: 87,
    gia_moi: 4000000.0,
  },
  {
    id: 88,
    gia_moi: 2800000.0,
  },
  {
    id: 89,
    gia_moi: 2800000.0,
  },
  {
    id: 90,
    gia_moi: 2800000.0,
  },
  {
    id: 91,
    gia_moi: 1250000.0,
  },
  {
    id: 92,
    gia_moi: 1250000.0,
  },
  {
    id: 94,
    gia_moi: 5000000.0,
  },
  {
    id: 95,
    gia_moi: 5000000.0,
  },
  {
    id: 99,
    gia_moi: 4125000.0,
  },
  {
    id: 100,
    gia_moi: 4125000.0,
  },
  {
    id: 101,
    gia_moi: 4125000.0,
  },
  {
    id: 102,
    gia_moi: 3750000.0,
  },
  {
    id: 103,
    gia_moi: 3750000.0,
  },
  {
    id: 104,
    gia_moi: 3750000.0,
  },
  {
    id: 105,
    gia_moi: 1750000.0,
  },
  {
    id: 106,
    gia_moi: 1750000.0,
  },
  {
    id: 107,
    gia_moi: 1750000.0,
  },
  {
    id: 108,
    gia_moi: 2600000.0,
  },
  {
    id: 109,
    gia_moi: 2600000.0,
  },
];

const getRandomNumber = (length: number) => {
  return Math.floor(Math.random() * length);
};

const openOrder = () => {
  const sp = SP_BT[getRandomNumber(SP_BT.length)];
  const payload = {
    phuongThucTT: "COD",
    note: "",
    hoTenNguoiNhan: vietnameseNames[getRandomNumber(vietnameseNames.length)],
    soDienThoaiNhanHang:
      "057" + Array.from({ length: 7 }, () => getRandomDigit()).join(""),
    diaChiNhanHang:
      "số 40 xuân tỏa__6692##XÃ THIỆU VÂN__1##QUẬN HOÀN KIẾM__1##Hà Nội",
    shipFee: 22000,
    totalPay: sp.gia_moi + 22000,
    gioHangTamThoiReqDto: [
      {
        sanPhamBienThe: sp.id,
        soLuong: 1,
      },
    ],
  };

  PaymentService.checkout(payload)

  console.log("order: ", payload);
};

onMounted(() => {

    // setInterval(() => {
    //     openOrder()
    // }, 500)
});
</script>
