export interface Criteria {
  text: string;
  score: number;
}

export interface CriteriaCheck {
  comment: string;
  score: number;
}

export interface CheckScore {
  basic: CriteriaCheck[];
  extra: CriteriaCheck[];
  fines: CriteriaCheck[];
}
