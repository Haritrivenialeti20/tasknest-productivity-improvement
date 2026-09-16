import React, { useState, useEffect } from 'react';
import { fetchScore } from '../services/api';
import { Award, TrendingUp } from 'lucide-react';

const ScoreWidget = ({ tasks }) => {
  const [scoreData, setScoreData] = useState({ value: 0, completedTasks: 0, importantCompletedTasks: 0 });

  useEffect(() => {
    const getScore = async () => {
      try { setScoreData(await fetchScore()); }
      catch (err) { console.error('Error fetching score:', err); }
    };
    getScore();
  }, [tasks]);

  return (
    <div className="score-hero-card">
      <div className="score-hero-left">
        <h2>Your Productivity</h2>
        <div className="score-big">{scoreData.value}<span>pts</span></div>
        <p style={{ marginTop: '1rem', opacity: 0.7 }}>
          {scoreData.completedTasks} completed task{scoreData.completedTasks === 1 ? '' : 's'} · important tasks are worth double.
        </p>
      </div>
      <div className="score-hero-right">
        <div className="status-badge" style={{ background: '#4ade80', color: '#064e3b', marginBottom: '1rem' }}><TrendingUp size={16} />Clear progress</div>
        <div className="logo-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', color: 'white' }}><Award size={48} /></div>
      </div>
    </div>
  );
};

export default ScoreWidget;
