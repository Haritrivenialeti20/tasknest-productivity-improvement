import React, { useState, useEffect } from 'react';
import { fetchScore } from '../services/api';
import { Award, TrendingUp } from 'lucide-react';

const ScoreWidget = ({ tasks }) => {
  const [score, setScore] = useState({ value: 0, basePoints: 0, consistencyBonus: 0, completedTasks: 0, importantCompleted: 0 });

  useEffect(() => {
    fetchScore().then(setScore).catch((err) => console.error('Error fetching score:', err));
  }, [tasks]);

  const status = score.completedTasks === 0 ? 'Ready to start' : score.consistencyBonus > 0 ? 'Building consistency' : 'Making progress';

  return (
    <div className="score-hero-card">
      <div className="score-hero-left">
        <h2>Your Productivity</h2>
        <div className="score-big">{score.value}<span>pts</span></div>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>{score.completedTasks} completed · {score.importantCompleted} important</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.7, fontSize: '0.9rem' }}>10 pts regular · 20 pts important · +5 pts every 3 completed</p>
      </div>
      <div className="score-hero-right">
        <div className="status-badge" style={{ background: '#4ade80', color: '#064e3b', marginBottom: '1rem' }}>
          <TrendingUp size={16} /> {status}
        </div>
        <div className="logo-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white' }}>
          <Award size={48} />
        </div>
      </div>
    </div>
  );
};
export default ScoreWidget;
