import React from 'react';
import { View, Text, StyleSheet } from '@react-pdf/renderer';
import { Collier } from '../../types/collier.types';


const ContentSection = ({ collier }) => {
  const styles = StyleSheet.create({
    section: {
      marginBottom: 15,
    },
    sectionTitle: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#1e40af',
      marginBottom: 5,
    },
    userSection: {
      backgroundColor: '#f1f5f9',
      padding: 10,
      borderRadius: 5,
      marginBottom: 15,
    },
    fieldContainer: {
      flexDirection: 'row',
      marginBottom: 7,
    },
    fieldLabel: {
      fontSize: 11,
      fontWeight: 'bold',
      width: '30%',
      color: '#475569',
    },
    fieldValue: {
      fontSize: 11,
      width: '70%',
      color: '#1f2937',
    },
    primaryInfo: {
      borderLeftWidth: 3,
      borderLeftColor: '#2563eb',
      paddingLeft: 8,
      marginBottom: 12,
    },
    secondaryInfo: {
      paddingLeft: 8,
    },
    priorityHigh: {
      color: '#dc2626',
      fontWeight: 'bold',
    },
    priorityMedium: {
      color: '#ea580c',
      fontWeight: 'bold',
    },
    priorityLow: {
      color: '#4d7c0f',
      fontWeight: 'bold',
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: '#cbd5e1',
      marginVertical: 10,
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityStyle = (priority) => {
    if (!priority) return {};
    
    switch(priority.toLowerCase()) {
      case 'haute': 
      case 'high':
        return styles.priorityHigh;
      case 'moyenne':
      case 'medium':
        return styles.priorityMedium;
      case 'basse':
      case 'low':
        return styles.priorityLow;
      default:
        return {};
    }
  };

  return (
    <View style={styles.section}>
      {collier.user && (
        <View style={styles.userSection}>
          <Text style={styles.sectionTitle}>Informations Utilisateur</Text>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Nom:</Text>
            <Text style={styles.fieldValue}>{collier.user.name}</Text>
          </View>
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Email:</Text>
            <Text style={styles.fieldValue}>{collier.user.email}</Text>
          </View>
        </View>
      )}
      
      <View style={styles.primaryInfo}>
        <Text style={styles.sectionTitle}>Informations Principales</Text>
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Titre:</Text>
          <Text style={styles.fieldValue}>{collier.titre}</Text>
        </View>
        {collier.Object && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Objet:</Text>
            <Text style={styles.fieldValue}>{collier.Object}</Text>
          </View>
        )}
        {collier.type_colier_electroniques && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Type:</Text>
            <Text style={styles.fieldValue}>{collier.type_colier_electroniques}</Text>
          </View>
        )}
        <View style={styles.fieldContainer}>
          <Text style={styles.fieldLabel}>Date de création:</Text>
          <Text style={styles.fieldValue}>{formatDate(collier.created_at)}</Text>
        </View>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.secondaryInfo}>
        {collier.reference && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Référence:</Text>
            <Text style={styles.fieldValue}>{collier.reference}</Text>
          </View>
        )}
        {collier.destinataire && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Destinataire:</Text>
            <Text style={styles.fieldValue}>{collier.destinataire}</Text>
          </View>
        )}
        {collier.priorite && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Priorité:</Text>
            <Text style={[styles.fieldValue, getPriorityStyle(collier.priorite)]}>
              {collier.priorite}
            </Text>
          </View>
        )}
        {collier.statut && (
          <View style={styles.fieldContainer}>
            <Text style={styles.fieldLabel}>Statut:</Text>
            <Text style={styles.fieldValue}>{collier.statut}</Text>
          </View>
        )}
      </View>
      
      {collier.contenu && (
        <>
          <View style={styles.divider} />
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contenu du message</Text>
            <Text style={styles.fieldValue}>{collier.contenu}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default ContentSection;