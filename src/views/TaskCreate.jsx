import Layout from "../components/Layout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchStatuses,
  fetchDepartments,
  fetchEmployees,
  fetchPriorities,
  createTask,
} from "../services/api";

const TaskCreate = () => {
  const [statuses, setStatuses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [priorities, setPriorities] = useState([]);

  const navigate = useNavigate();
  const token = import.meta.env.VITE_API_TOKEN;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    due_date: "",
    status_id: "",
    employee_id: "",
    priority_id: "",
    department_id: "",
  });

  const [validations, setValidations] = useState({
    nameValid: false,
    descriptionValid: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusData, departmentData, employeeData, priorityData] =
          await Promise.all([
            fetchStatuses(),
            fetchDepartments(),
            fetchEmployees(token),
            fetchPriorities(),
          ]);

        setStatuses(statusData);
        setDepartments(departmentData);
        setEmployees(employeeData);
        setPriorities(priorityData);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchData();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setValidations({
        ...validations,
        nameValid: value.length > 2 && value.length <= 255,
      });
    }

    if (name === "description") {
      const wordCount = value.trim().split(/\s+/).length;
      setValidations({
        ...validations,
        descriptionValid: wordCount >= 4 && value.length <= 255,
      });
    }

    if (name === "department_id") {
      setFormData({ ...formData, [name]: value, employee_id: "" });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const filteredEmployees = formData.department_id
    ? employees.filter(
        (employee) =>
          employee.department &&
          employee.department.id.toString() === formData.department_id
      )
    : [];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      status_id: Number(formData.status_id),
      employee_id: Number(formData.employee_id),
      priority_id: Number(formData.priority_id),
      department_id: Number(formData.department_id),
    };

    try {
      await createTask(token, payload);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <h1 className="w-[1684px] h-[41px] top-[140px] left-[118px] font-[600] text-[30px] leading-[100%] tracking-[0%] text-[#212529] mt-[70px] mb-5">
        შექმენი ახალი დავალება
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex w-full h-[804px] top-[211px] left-[118px] rounded-[4px] border border-[#DDD2FF] bg-[#FBF9FFA6] px-[50px] py-[60px] font-normal text-[16px] leading-[100%] tracking-[0%] text-[#343A40] flex-wrap"
      >
        <div className="flex-1 flex flex-col space-y-8 mt-[10px] mr-[30px]">
          <div className="flex flex-col">
            <span className="mb-2">სათაური*</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-[550px] h-[50px] rounded-[5px] border border-[#DEE2E6] p-[14px]"
            />
            <span
              className={`mt-2 ${
                validations.nameValid ? "text-green-500" : "text-red-500"
              }`}
            >
              <div>მინიმუმ 2 სიმბოლო</div>
              <div>მაქსიმუმ 255 სიმბოლო</div>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="mb-2">აღწერა</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-[550px] h-[133px] rounded-[5px] border border-[#DEE2E6] p-[14px] resize-none"
            />
            <span
              className={`mt-2 ${
                validations.descriptionValid ? "text-green-500" : "text-red-500"
              }`}
            >
              <div>მინიმუმ 4 სიტყვა</div>
              <div>მაქსიმუმ 255 სიმბოლო</div>
            </span>
          </div>

          <div className="flex items-center justify-between w-[550px]">
            <div className="flex flex-col">
              <span className="mb-2">პრიორიტეტი*</span>
              <select
                name="priority_id"
                value={formData.priority_id}
                onChange={handleChange}
                required
                className="w-[259px] h-[50px] rounded-[5px] border border-[#CED4DA] p-[14px] font-light text-[14px] leading-[100%] tracking-[0%] text-[#0D0F10]"
              >
                <option value="">აირჩიეთ პრიორიტეტი</option>
                {priorities.map((priority) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <span className="mb-2">სტატუსი*</span>
              <select
                name="status_id"
                value={formData.status_id}
                onChange={handleChange}
                required
                className="w-[259px] h-[50px] rounded-[5px] border border-[#CED4DA] p-[14px] font-light text-[14px] leading-[100%] tracking-[0%] text-[#0D0F10]"
              >
                <option value="">აირჩიეთ სტატუსი</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col space-y-20 mt-[1px] mr-[30px] relative">
          <div className="flex flex-col">
            <span className="mb-2">დეპარტამენტი*</span>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              className="w-[550px] h-[50px] rounded-[5px] border border-[#DEE2E6] p-[14px] text-[14px]"
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          {formData.department_id && (
            <div>
              <span className="">პასუხისმგებელი თანამშრომელი*</span>
              <select
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                className="w-[550px] h-[50px] rounded-[5px] border border-[#DEE2E6] p-[14px] text-[14px] mt-2"
              >
                <option value="">აირჩიეთ თანამშრომელი</option>
                {filteredEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name} {employee.surname}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="absolute bottom-0 w-full flex flex-col mb-[73px]">
            <span className="mb-2">დედლაინი*</span>
            <input
              type="date"
              name="due_date"
              value={formData.due_date}
              onChange={handleChange}
              className="w-[318px] h-[50px] rounded-[5px] border border-[#DEE2E6] p-[14px]"
              min={new Date().toISOString().split("T")[0]}
              required
            />
          </div>
        </div>

        <div className="flex justify-end w-full mt-10 mr-[265px]">
          <button
            type="submit"
            className="w-[208px] h-[42px] rounded-[5px] pt-[10px] pr-[20px] pb-[10px] pl-[20px] bg-[#8338EC] text-white text-[16px] leading-[100%]"
          >
            დავალების შექმნა
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default TaskCreate;
