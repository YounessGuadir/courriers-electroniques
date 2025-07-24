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

export default function AfficherFacteurColier() {
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
                const colierResponse = await ColierApi.allFacteur();
                setColier(colierResponse.data.coliers);
            } catch (error) {
                setErrorColier("Échec du chargement des colis");
                toast.error("Impossible de charger les colis");
            } finally {
                setLoadingColier(false);
            }

            try {
                const destinataireResponse = await DestinataireApi.allFacteur();
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
            pending: { label: 'En attente', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
            delivered: { label: 'Livré', className: 'bg-green-100 text-green-800 border-green-200' },
            cancelled: { label: 'Annulé', className: 'bg-red-100 text-red-800 border-red-200' },
            processing: { label: 'En cours', className: 'bg-blue-100 text-blue-800 border-blue-200' }
        };
        const config = statusConfig[status] || statusConfig.pending;
        return <Badge variant="outline" className={`${config.className} border`}>{config.label}</Badge>;
    };

    if (loadingColier || loadingDestinataire) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex items-center gap-2 text-primary">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span className="font-medium">Chargement...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-8  rounded-xl shadow-sm border p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-primary/10 rounded-xl">
                            <Truck className="h-8 w-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold ">Gestion des Courriers</h1>
                            <p className="text-gray-500 mt-1">Supervision et suivi des livraisons</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex-1 lg:flex-none">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 " />
                                <Input 
                                    type="text"
                                    placeholder="Rechercher un courrier..."
                                    className="pl-9 w-full lg:w-[300px]"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Filter className="w-4 h-4" />
                                    <span>Filtrer</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[200px]">
                                <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                                    Tous les statuts
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                                    En attente
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('processing')}>
                                    En cours
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('delivered')}>
                                    Livrés
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setStatusFilter('cancelled')}>
                                    Annulés
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button className="flex items-center gap-2">
                            <Package className="w-4 h-4" />
                            <span>Nouveau Courrier</span>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Packages Section */}
            <div className="mb-12">
                {errorColier ? (
                    <div className="rounded-xl  p-4 text-red-800 border ">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <p className="font-medium">{errorColier}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {colier.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-start justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-primary/10 rounded-lg">
                                                        <Package className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h2 className="font-semibold text-lg ">
                                                            {item.Object}
                                                        </h2>
                                                        <p className="text-sm text-gray-400">{item.titre}</p>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'delivered')}>
                                                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" />
                                                            Marquer comme livré
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'processing')}>
                                                            <Truck className="mr-2 h-4 w-4 text-blue-500" />
                                                            En cours de livraison
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => handlePackageAction(item.id, 'cancelled')}>
                                                            <XCircle className="mr-2 h-4 w-4 text-red-500" />
                                                            Annuler
                                                        </DropdownMenuItem>
                                                        <DropdownMenuSeparator />
                                                      
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>

                                            <div className="space-y-3 mb-4">
                                                <div className="flex items-center gap-2">
                                                    <User className="h-4 w-4" />
                                                    <span className="text-sm">Client: {item.user?.name}</span>
                                                </div>
                                              
                                            </div>

                                            <div className="flex items-center justify-between pt-4 border-t">
                                                {getStatusBadge(item.status || 'pending')}
                                                <Button variant="outline" size="sm" className="ml-auto">
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
            </div>

            {/* Recipients Section */}
            <div className=" rounded-xl p-6 border">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                            <User className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold ">Destinataires</h2>
                            <p className="text-sm text-gray-500">Liste des destinataires enregistrés</p>
                        </div>
                    </div>
                    <Button variant="outline" className="hidden sm:flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>Ajouter un destinataire</span>
                    </Button>
                </div>

                {errorDestinataire ? (
                    <div className="rounded-xl  p-4 text-red-800 border ">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            <p className="font-medium">{errorDestinataire}</p>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {destinataire.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <Card className="hover:shadow-lg transition-all duration-300">
                                        <CardContent className="p-6">
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-primary/10 rounded-lg">
                                                        <User className="h-5 w-5 text-primary" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-semibold text-lg">
                                                            {item.nom} {item.prenom}
                                                        </h3>
                                                        <p className="text-sm ">{item.user?.name}</p>
                                                    </div>
                                                </div>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon">
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>
                                                            <User className="mr-2 h-4 w-4" />
                                                            Modifier
                                                        </DropdownMenuItem>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <DropdownMenuItem className="text-red-600">
                                                                    <Trash2 className="mr-2 h-4 w-4" />
                                                                    Supprimer
                                                                </DropdownMenuItem>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Êtes-vous sûr de vouloir supprimer ce destinataire ? Cette action est irréversible.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleDelete(item.id, 'destinataire')}
                                                                        className="bg-red-600 hover:bg-red-700"
                                                                    >
                                                                        {deletingIds.has(item.id) ? (
                                                                            <Loader2 className="h-4 w-4 animate-spin" />
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

                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2 ">
                                                    <MapPin className="h-4 w-4" />
                                                    <span className="text-sm">{item.adresse}</span>
                                                </div>
                                                <div className="flex items-center gap-2 ">
                                                    <Phone className="h-4 w-4" />
                                                    <span className="text-sm">{item.phone}</span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
}