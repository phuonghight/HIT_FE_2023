<script setup>
import { ref, reactive, computed } from "vue";

const data = [
  {
    id: 1,
    fullName: "Bui Viet Hoang",
    phone: "0999999999",
    email: "buiviethoang@gmail.com",
    gender: "male",
  },
  {
    id: 2,
    fullName: "Dang Hoang Phuong",
    phone: "0111111111",
    email: "daghoangphuong@gmail.com",
    gender: "male",
  },
  {
    id: 3,
    fullName: "Trinh Thu Ha",
    phone: "0222222222",
    email: "trinhthuha@gmail.com",
    gender: "female",
  },
  {
    id: 4,
    fullName: "Nguyen Thi Trang",
    phone: "0333333333",
    email: "nguyenthitrang@gmail.com",
    gender: "female",
  },
];
const students = reactive(data);
const hide = ref([false, false, false, false]);
const gender = ref("");

const genderStudents = computed(() =>
  gender.value === ""
    ? students
    : students.filter((student) => student.gender === gender.value)
);

const change = (e) => {
  const value = e.target.options[e.target.options.selectedIndex].value;
  gender.value = value;
};
</script>

<template>
  <table border="1">
    <tr>
      <th>ID</th>
      <th>Fullname</th>
      <th>Phone</th>
      <th>Email</th>
      <th>
        <select name="gender" id="gender" @change="change">
          <option value="">Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </th>
      <th>Delete</th>
    </tr>
    <tr
      v-for="(student, index) in genderStudents"
      :key="index"
      :class="{ hidden: hide[index] }"
    >
      <th v-for="(value, key) in student" :key="key">
        {{ value }}
      </th>
      <th><button @click="hide[index] = true">X</button></th>
    </tr>
  </table>
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
