// API Configuration - Update VITE_API_URL in .env file
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

// ==================== DTO INTERFACES ====================
// DTO Interface
export interface QuantityDTO {
  value: number;
  unit: string;
  measurementType: string;
}

// Response Interface
export interface QuantityMeasurementDTO {
  thisQuantityDTO: QuantityDTO;
  thatQuantityDTO: QuantityDTO;
  result?: string | number;
  message?: string;
  error?: string;
  operation?: string;
  [key: string]: any;
}

// Auth Response Interface
export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  username?: string;
  email?: string;
  role?: string;
  [key: string]: any;
}

// Helper function to make API calls
export const apiCall = async (
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: any
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  // Add auth token if it exists
  const token = localStorage.getItem("qm_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || errorData.error || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// ==================== AUTH ENDPOINTS ====================
export const authAPI = {
  login: async (email: string, password: string) => {
    return apiCall("/auth/user/login", "POST", { email, password });
  },

  register: async (username: string, email: string, password: string, role: string = "USER") => {
    return apiCall("/auth/user/register", "POST", { username, email, password, role });
  },

  logout: async () => {
    localStorage.removeItem("qm_token");
    localStorage.removeItem("qm_user");
    localStorage.removeItem("qm_username");
  },
};

// ==================== QUANTITY ENDPOINTS ====================
export const quantityAPI = {
  // Compare two quantities
  compare: async (thisQuantity: QuantityDTO, thatQuantity: QuantityDTO) => {
    return apiCall("/api/v1/quantities/compare", "POST", {
      thisQuantityDTO: thisQuantity,
      thatQuantityDTO: thatQuantity,
    });
  },

  // Convert quantity
  convert: async (thisQuantity: QuantityDTO, thatQuantity: QuantityDTO) => {
    return apiCall("/api/v1/quantities/convert", "POST", {
      thisQuantityDTO: thisQuantity,
      thatQuantityDTO: thatQuantity,
    });
  },

  // Add two quantities
  add: async (thisQuantity: QuantityDTO, thatQuantity: QuantityDTO, targetQuantity?: QuantityDTO) => {
    const endpoint = targetQuantity ? "/api/v1/quantities/add-with-target-unit" : "/api/v1/quantities/add";
    const body: any = {
      thisQuantityDTO: thisQuantity,
      thatQuantityDTO: thatQuantity,
    };
    if (targetQuantity) {
      body.targetQuantityDTO = targetQuantity;
    }
    return apiCall(endpoint, "POST", body);
  },

  // Subtract two quantities
  subtract: async (thisQuantity: QuantityDTO, thatQuantity: QuantityDTO, targetQuantity?: QuantityDTO) => {
    const endpoint = targetQuantity ? "/api/v1/quantities/subtract-with-target-unit" : "/api/v1/quantities/subtract";
    const body: any = {
      thisQuantityDTO: thisQuantity,
      thatQuantityDTO: thatQuantity,
    };
    if (targetQuantity) {
      body.targetQuantityDTO = targetQuantity;
    }
    return apiCall(endpoint, "POST", body);
  },

  // Divide two quantities
  divide: async (thisQuantity: QuantityDTO, thatQuantity: QuantityDTO) => {
    return apiCall("/api/v1/quantities/divide", "POST", {
      thisQuantityDTO: thisQuantity,
      thatQuantityDTO: thatQuantity,
    });
  },

  // Get operation history
  getOperationHistory: async (operation: string) => {
    return apiCall(`/api/v1/quantities/history/operation/${operation}`, "GET");
  },

  // Get history by measurement type
  getHistoryByType: async (type: string) => {
    return apiCall(`/api/v1/quantities/history/type/${type}`, "GET");
  },

  // Get operation count
  getOperationCount: async (operation: string) => {
    return apiCall(`/api/v1/quantities/count/${operation}`, "GET");
  },

  // Get errored operations
  getErroredOperations: async () => {
    return apiCall("/api/v1/quantities/history/errored", "GET");
  },
};

// DTO Interface already defined at top of file
// Response Interface already defined at top of file  
// Auth Response Interface already defined at top of file
