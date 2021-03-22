import axios from "axios";

export default axios.create({
    baseURL: "http://krzysztoflakomyprojektbd1-env-1.eba-pypxtcmg.us-east-2.elasticbeanstalk.com/api/v1",
})