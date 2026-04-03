import React, { createContext, useContext, useMemo, useState } from 'react';
import { MATERIALS, SUBJECTS } from '../data/mockData';

const STORAGE_KEY = 'smart_curriculum_materials_v2_20260404';
const MaterialsContext = createContext(null);

const getInitialMaterials = () => {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return MATERIALS;

    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : MATERIALS;
  } catch {
    return MATERIALS;
  }
};

export const MaterialsProvider = ({ children }) => {
  const [materials, setMaterials] = useState(getInitialMaterials);

  const saveMaterials = (next) => {
    setMaterials(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const addMaterial = (payload) => {
    const sub = SUBJECTS.find((s) => s._id === payload.subjectId);
    const next = [
      {
        ...payload,
        _id: `m_${Date.now()}`,
        subjectName: sub?.code || payload.subjectName || 'N/A',
        downloads: 0,
        uploadedAt: new Date().toISOString().split('T')[0],
      },
      ...materials,
    ];
    saveMaterials(next);
  };

  const removeMaterial = (id) => {
    saveMaterials(materials.filter((m) => m._id !== id));
  };

  const value = useMemo(() => ({ materials, addMaterial, removeMaterial }), [materials]);

  return <MaterialsContext.Provider value={value}>{children}</MaterialsContext.Provider>;
};

export const useMaterials = () => {
  const ctx = useContext(MaterialsContext);
  if (!ctx) throw new Error('useMaterials must be used inside MaterialsProvider');
  return ctx;
};
