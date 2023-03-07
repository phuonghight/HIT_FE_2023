<script setup>
import { ref, reactive, computed } from "vue";

const data = [
  {
    id: 1,
    fullName: "Bui Viet Hoang",
    phone: "0999999999",
    email: "buiviethoang@gmail.com",
    gender: "Male",
  },
  {
    id: 2,
    fullName: "Dang Hoang Phuong",
    phone: "0111111111",
    email: "daghoangphuong@gmail.com",
    gender: "Male",
  },
  {
    id: 3,
    fullName: "Trinh Thu Ha",
    phone: "0222222222",
    email: "trinhthuha@gmail.com",
    gender: "Female",
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
const isHide = reactive([false, false, false, false]);
const gender = ref("");

const genderStudents = computed(() =>
  gender.value === ""
    ? students
    : students.filter((student) => student.gender === gender.value)
);

const genderFilter = (e) => {
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
        <select name="gender" id="gender" @change="genderFilter">
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
      :class="{ hidden: isHide[index] }"
    >
      <td v-for="(value, key) in student" :key="key">
        {{ value }}
      </td>
      <td><button @click="isHide[index] = true">X</button></td>
    </tr>
  </table>
</template>

<style scoped>
.hidden {
  display: none;
}
</style>
