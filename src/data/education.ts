export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  score: string;
}

export const educationList: Education[] = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Shivaji University',
    location: 'Kolhapur, India',
    period: '2024 - Expected 2026',
    score: 'Pursuing'
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Shivaji University',
    location: 'Kolhapur, India',
    period: '2021 - 2024',
    score: '68.53%'
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: 'Yashwant Jr. College',
    location: 'Kodoli, India',
    period: '2020 - 2021',
    score: '74.00%'
  },
  {
    degree: 'Secondary School Certificate (SSC)',
    institution: 'Kodoli Highschool',
    location: 'Kodoli, India',
    period: '2018 - 2019',
    score: '63.00%'
  }
];
