import axios from 'axios';

const Dashboard = {
  async getSchools() {
    const url = 'https://www.eaglevisionapp.com/api/index2';
    const res = await axios.get(url);
    return res.data;
  },
  async getCourses(subject: string) {
    const url = `https://www.eaglevisionapp.com/api/${subject}`;
    const res = await axios.get(url);
    return res.data;
  },
  async getCourse(code: string) {
    const url = `https://www.eaglevisionapp.com/api/2020S+${code}`;
    const res = await axios.get(url);
    return res.data;
  }
};

export default Dashboard;
