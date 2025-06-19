export interface TeamMember {
  id: number;
  name: string;
  designation?: string;
  department?: string;
  profile?: string;
  parentId?: number;
  children?: TeamMember[];
  isCollapsed?: boolean;
}
