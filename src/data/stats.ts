export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 3, suffix: '+', label: 'Projects Completed' },
  { value: 2, suffix: '+', label: 'Years Learning' },
  { value: 20, suffix: '+', label: 'Technologies Mastered' },
  { value: 500, suffix: '+', label: 'Git Commits' }
];
