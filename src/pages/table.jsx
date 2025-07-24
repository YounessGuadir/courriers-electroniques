import React from "react";

const Table = () => {
  const sources = [
    {
      source: "Laravel Documentation",
      link: "https://laravel.com/docs",
      usage: "Référence pour le développement back-end, routing, authentification, et sécurité.",
    },
    {
      source: "Next.js Documentation",
      link: "https://nextjs.org/docs",
      usage: "Utilisée pour le développement de l’interface utilisateur (frontend).",
    },
    {
      source: "Tailwind CSS",
      link: "https://tailwindcss.com/docs",
      usage: "Framework CSS pour le design responsive et moderne.",
    },
    {
      source: "ShadCN UI",
      link: "https://ui.shadcn.dev",
      usage: "Utilisé pour les composants UI avancés (modales, boutons, cartes, etc.).",
    },
    {
      source: "Lucide Icons",
      link: "https://lucide.dev",
      usage: "Pour l’intégration d’icônes modernes dans l’interface utilisateur.",
    },
    {
      source: "PlantUML",
      link: "https://plantuml.com",
      usage: "Pour la création des diagrammes UML (cas d’utilisation, séquences, états, etc.).",
    },
    {
      source: "MySQL Documentation",
      link: "https://dev.mysql.com/doc",
      usage: "Guide de conception et gestion de la base de données relationnelle.",
    },
  ];

  return (
    <div className="overflow-x-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Webographie</h2>
      <table className="min-w-full border border-gray-200 rounded-xl shadow-md">
        <thead className="bg-indigo-100 text-indigo-800">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">Source</th>
            <th className="px-6 py-3 text-left font-semibold">Lien</th>
            <th className="px-6 py-3 text-left font-semibold">Utilisation</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sources.map((item, index) => (
            <tr key={index} className="hover:bg-indigo-50">
              <td className="px-6 py-4">{item.source}</td>
              <td className="px-6 py-4 text-blue-600 underline">
                <a href={item.link} target="_blank" rel="noopener noreferrer">
                  {item.link}
                </a>
              </td>
              <td className="px-6 py-4">{item.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
