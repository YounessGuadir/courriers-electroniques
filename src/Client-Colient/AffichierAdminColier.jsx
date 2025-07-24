import React, { useEffect, useState } from 'react';
import ColierApi from '../servicesApi/ColierApi';
import DestinataireApi from '../servicesApi/DestinataireApi';
import { Package, MapPin, Phone, User, Calendar, Truck, Loader2, Search, Filter, MoreVertical, CheckCircle2, XCircle, Trash2, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

export default function AfficherAdminColier() {
    const [colier, setColier] = useState([]);
    const [destinataire, setDestinataire] = useState([]);
    const [loadingColier, setLoadingColier] = useState(true);
    const [loadingDestinataire, setLoadingDestinataire] = useState(true);
    const [errorColier, setErrorColier] = useState(null);
    const [errorDestinataire, setErrorDestinataire] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [deletingIds, setDeletingIds] = useState(new Set());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const colierResponse = await ColierApi.allAdmin();
                setColier(colierResponse.data.coliers);
            } catch (error) {
                setErrorColier("Échec du chargement des colis");
                toast.error("Impossible de charger les colis");
            } finally {
                setLoadingColier(false);
            }

            try {
                const destinataireResponse = await DestinataireApi.allAdmin();
                setDestinataire(destinataireResponse.data.destinataires);
            } catch (error) {
                setErrorDestinataire("Échec du chargement des destinataires");
                toast.error("Impossible de charger les destinataires");
            } finally {
                setLoadingDestinataire(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id, type) => {
        setDeletingIds(prev => new Set([...prev, id]));
        try {
            if (type === 'colier') {
                await ColierApi.delete(id);
                setColier(prev => prev.filter(item => item.id !== id));
                toast.success("Courrier supprimé avec succès");
            } else {
                await DestinataireApi.delete(id);
                setDestinataire(prev => prev.filter(item => item.id !== id));
                toast.success("Destinataire supprimé avec succès");
            }
        } catch (error) {
            toast.error(`Échec de la suppression: ${error.message}`);
        } finally {
            setDeletingIds(prev => {
                const newSet = new Set(prev);
                newSet.delete(id);
                return newSet;
            });
        }
    };

    const handlePackageAction = async (packageId, action) => {
        try {
            toast.promise(
                // Simulated API call
                new Promise((resolve) => setTimeout(resolve, 1000)),
                {
                    loading: 'Mise à jour du statut...',
                    success: 'Statut mis à jour avec succès',
                    error: 'Échec de la mise à jour',
                }
            );
            
            setColier(prevColier => 
                prevColier.map(pkg => 
                    pkg.id === packageId 
                        ? {...pkg, status: action}
                        : pkg
                )
            );
        } catch (error) {
            toast.error('Échec de la mise à jour du statut');
        }
    };

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { 
                label: 'En attente', 
                className: 'bg-gradient-to-r from-yellow-400/20 to-orange-400/20 text-yellow-800 dark:text-yellow-300 border-yellow-300 dark:border-yellow-600 shadow-sm'
            },
            delivered: { 
                label: 'Livré', 
                className: 'bg-gradient-to-r from-green-400/20 to-emerald-400/20 text-green-800 dark:text-green-300 border-green-300 dark:border-green-600 shadow-sm'
            },
            cancelled: { 
                label: 'Annulé', 
                className: 'bg-gradient-to-r from-red-400/20 to-pink-400/20 text-red-800 dark:text-red-300 border-red-300 dark:border-red-600 shadow-sm'
            },
            processing: { 
                label: 'En cours', 
                className: 'bg-gradient-to-r from-blue-400/20 to-cyan-400/20 text-blue-800 dark:text-blue-300 border-blue-300 dark:border-blue-600 shadow-sm'
            }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return <Badge variant="outline" className={`${config.className} border font-medium`}>{config.label}</Badge>;
    };

    if (loadingColier || loadingDestinataire) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
                <div className="flex items-center gap-3 text-primary bg-card/80 backdrop-blur-sm rounded-2xl px-8 py-6 border shadow-2xl">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="font-semibold text-lg">Chargement des données...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/10 dark:from-background dark:via-background dark:to-primary/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 bg-gradient-to-r from-card/90 to-card/70 dark:from-card/95 dark:to-card/80 backdrop-blur-xl rounded-2xl shadow-xl border border-border/50 p-8"
                >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/15 rounded-2xl shadow-lg">
                                <Truck className="h-10 w-10 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                    Gestion des Courriers
                                </h1>
                                <p className="text-muted-foreground mt-2 text-lg">Supervision et suivi des livraisons</p>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex-1 lg:flex-none">
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                                    <Input 
                                        type="text"
                                        placeholder="Rechercher un courrier..."
                                        className="pl-12 w-full lg:w-[350px] h-12 bg-background/80 dark:bg-background/90 border-border/50 rounded-xl shadow-sm focus:shadow-md transition-all duration-300"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" size="lg" className="bg-background/80 dark:bg-background/90 border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                                        <Filter className="w-5 h-5 mr-2" />
                                        Filtrer
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-[200px] bg-card/95 backdrop-blur-sm border-border/50 rounded-xl shadow-xl">
                                    <DropdownMenuItem onClick={() => setStatusFilter('all')} className="rounded-lg">
                                        Tous les statuts
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('pending')} className="rounded-lg">
                                        En attente
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('processing')} className="rounded-lg">
                                        En cours
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('delivered')} className="rounded-lg">
                                        Livrés
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => setStatusFilter('cancelled')} className="rounded-lg">
                                        Annulés
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                                <Package className="w-5 h-5 mr-2" />
                                Nouveau Courrier
                            </Button>
                        </div>
                    </div>
                </motion.div>

                {/* Packages Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-12"
                >
                    {errorColier ? (
                        <div className="rounded-2xl bg-gradient-to-r from-destructive/10 to-destructive/5 p-6 text-destructive border border-destructive/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-6 w-6" />
                                <p className="font-semibold text-lg">{errorColier}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {colier.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-card/90 to-card/70 dark:from-card/95 dark:to-card/80 backdrop-blur-sm border-border/50 rounded-2xl">
                                            <CardContent className="p-8">
                                                <div className="flex items-start justify-between mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/15 rounded-xl shadow-md">
                                                            <Package className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h2 className="font-bold text-xl text-foreground">
                                                                {item.Object}
                                                            </h2>
                                                            <p className="text-muted-foreground text-sm mt-1">{item.titre}</p>
                                                        </div>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon" 
                                                                className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-background/80 rounded-xl"
                                                            >
                                                                <MoreVertical className="h-5 w-5" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-sm border-border/50 rounded-xl shadow-xl">
                                                            <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'delivered')} className="rounded-lg">
                                                                <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" />
                                                                Marquer comme livré
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'processing')} className="rounded-lg">
                                                                <Truck className="mr-3 h-5 w-5 text-blue-500" />
                                                                En cours de livraison
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'cancelled')} className="rounded-lg">
                                                                <XCircle className="mr-3 h-5 w-5 text-red-500" />
                                                                Annuler
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem className="text-red-600 dark:text-red-400 rounded-lg">
                                                                        <Trash2 className="mr-3 h-5 w-5" />
                                                                        Supprimer
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent className="bg-card/95 backdrop-blur-sm border-border/50 rounded-2xl">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle className="text-2xl">Confirmer la suppression</AlertDialogTitle>
                                                                        <AlertDialogDescription className="text-lg">
                                                                            Êtes-vous sûr de vouloir supprimer ce courrier ? Cette action est irréversible.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(item.id, 'colier')}
                                                                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl"
                                                                        >
                                                                            {deletingIds.has(item.id) ? (
                                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                                            ) : (
                                                                                "Supprimer"
                                                                            )}
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <div className="space-y-4 mb-6">
                                                    <div className="flex items-center gap-3 text-muted-foreground">
                                                        <User className="h-5 w-5" />
                                                        <span className="text-sm font-medium">Client: {item.user?.name}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                                                    {getStatusBadge(item.status || 'pending')}
                                                    <Button 
                                                        variant="outline" 
                                                        size="sm" 
                                                        className="ml-auto bg-background/80 dark:bg-background/90 border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                                                    >
                                                        Voir les détails
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>

                {/* Recipients Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-r from-card/90 to-card/70 dark:from-card/95 dark:to-card/80 backdrop-blur-xl rounded-2xl p-8 border border-border/50 shadow-xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/15 rounded-xl shadow-md">
                                <User className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                    Destinataires
                                </h2>
                                <p className="text-muted-foreground mt-1">Liste des destinataires enregistrés</p>
                            </div>
                        </div>
                        <Button 
                            variant="outline" 
                            size="lg"
                            className="hidden sm:flex items-center gap-3 bg-background/80 dark:bg-background/90 border-border/50 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                        >
                            <User className="w-5 h-5" />
                            Ajouter un destinataire
                        </Button>
                    </div>

                    {errorDestinataire ? (
                        <div className="rounded-2xl bg-gradient-to-r from-destructive/10 to-destructive/5 p-6 text-destructive border border-destructive/20 shadow-lg">
                            <div className="flex items-center gap-3">
                                <AlertCircle className="h-6 w-6" />
                                <p className="font-semibold text-lg">{errorDestinataire}</p>
                            </div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                            <AnimatePresence>
                                {destinataire.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -30, scale: 0.95 }}
                                        transition={{ delay: index * 0.1, duration: 0.5 }}
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <Card className="hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-background/80 to-background/60 dark:from-background/90 dark:to-background/70 backdrop-blur-sm border-border/50 rounded-2xl">
                                            <CardContent className="p-8">
                                                <div className="flex items-center justify-between mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/10 dark:from-primary/30 dark:to-primary/15 rounded-xl shadow-md">
                                                            <User className="h-6 w-6 text-primary" />
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-xl text-foreground">
                                                                {item.nom} {item.prenom}
                                                            </h3>
                                                            <p className="text-muted-foreground text-sm mt-1">{item.user?.name}</p>
                                                        </div>
                                                    </div>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button 
                                                                variant="ghost" 
                                                                size="icon"
                                                                className="hover:bg-background/80 rounded-xl transition-all duration-300"
                                                            >
                                                                <MoreVertical className="h-5 w-5" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-card/95 backdrop-blur-sm border-border/50 rounded-xl shadow-xl">
                                                            <DropdownMenuItem className="rounded-lg">
                                                                <User className="mr-3 h-5 w-5" />
                                                                Modifier
                                                            </DropdownMenuItem>
                                                            <AlertDialog>
                                                                <AlertDialogTrigger asChild>
                                                                    <DropdownMenuItem className="text-red-600 dark:text-red-400 rounded-lg">
                                                                        <Trash2 className="mr-3 h-5 w-5" />
                                                                        Supprimer
                                                                    </DropdownMenuItem>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent className="bg-card/95 backdrop-blur-sm border-border/50 rounded-2xl">
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle className="text-2xl">Confirmer la suppression</AlertDialogTitle>
                                                                        <AlertDialogDescription className="text-lg">
                                                                            Êtes-vous sûr de vouloir supprimer ce destinataire ? Cette action est irréversible.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel className="rounded-xl">Annuler</AlertDialogCancel>
                                                                        <AlertDialogAction
                                                                            onClick={() => handleDelete(item.id, 'destinataire')}
                                                                            className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl"
                                                                        >
                                                                            {deletingIds.has(item.id) ? (
                                                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                                            ) : (
                                                                                "Supprimer"
                                                                            )}
                                                                        </AlertDialogAction>
                                                                    </AlertDialogFooter>
                                                                </AlertDialogContent>
                                                            </AlertDialog>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>

                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-3 text-muted-foreground">
                                                        <MapPin className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{item.adresse}</span>
                                                    </div>
                                                    <div className="flex items-center gap-3 text-muted-foreground">
                                                        <Phone className="h-5 w-5" />
                                                        <span className="text-sm font-medium">{item.phone}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
}
