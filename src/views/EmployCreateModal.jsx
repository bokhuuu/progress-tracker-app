import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, fetchDepartments } from "../services/api";

const EmployeeCreateModal = ({ isOpen, onClose }) => {
  const [departments, setDepartments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    department_id: "",
    avatar: null,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      try {
        const deptData = await fetchDepartments();
        setDepartments(deptData);
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    };

    if (isOpen) {
      getDepartments();
    }
  }, [isOpen]);

  const token = import.meta.env.VITE_API_TOKEN;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      avatar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("surname", formData.surname);
    data.append("department_id", formData.department_id);
    if (formData.avatar) {
      data.append("avatar", formData.avatar);
    }

    try {
      await createEmployee(token, data);
      onClose();
      navigate("/");
    } catch (error) {
      console.error("Error creating employee:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-transparent"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-transparent backdrop-blur-sm" />

      <div
        className="space-y-6 w-[913px] h-[766px] rounded-[10px] pt-[40px] pr-[50px] pb-[60px] pl-[50px] gap-[37px] bg-white shadow-2xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-bold text-[32px] leading-[100%] tracking-[0%] text-center text-[#212529] mb-[50px]">
          თანამშრომლის დამატება
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between">
            <div>
              <span className="mb-2 block">სახელი*</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-[384px] h-[42px] rounded-[6px] border border-[#CED4DA] p-[10px] bg-white"
                required
              />
            </div>

            <div>
              <span className="mb-2 block">გვარი*</span>
              <input
                type="text"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                className="w-[384px] h-[42px] rounded-[6px] border border-[#CED4DA] p-[10px] bg-white"
                required
              />
            </div>
          </div>

          <div>
            <span className="mb-2 block">ავატარი*</span>
            <input
              type="file"
              name="avatar"
              onChange={handleFileChange}
              className="w-[813px] h-[120px] rounded-[8px] border border-[#CED4DA] bg-white"
              required
            />
          </div>

          <div className="flex flex-col">
            <span className="mb-2 block">დეპარტამენტი*</span>
            <select
              name="department_id"
              value={formData.department_id}
              onChange={handleChange}
              required
              className="w-[384px] h-[42px] rounded-[6px] border border-[#CED4DA] p-[10px] bg-white"
            >
              <option value="">აირჩიეთ დეპარტამენტი</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              გაუქმება
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#8338EC] text-white rounded hover:bg-[#6a2bbf]"
            >
              დაამატე თანამშრომელი
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeCreateModal;
