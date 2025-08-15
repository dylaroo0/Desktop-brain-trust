export interface Agent {
  id: string;
  name: string;
  role: string;
  systemInstruction: string;
  avatar?: string | React.ReactNode;
  description?: string;
  tags?: string[];
  capabilities?: string[];
}
