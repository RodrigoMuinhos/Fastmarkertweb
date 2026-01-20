import React, { useState } from 'react';
import { Logo } from '../../components/fastmarket/Logo';
import { Button } from '../../components/fastmarket/Button';
import { Card } from '../../components/fastmarket/Card';
import { Modal } from '../../components/fastmarket/Modal';
import { Input } from '../../components/fastmarket/Input';
import { ArrowLeft, Plus, Edit, ToggleLeft, ToggleRight } from 'lucide-react';
import { useFastMarket } from '../../context/FastMarketContext';

export function ProductsScreen() {
  const { products, updateProduct, addProduct, setCurrentScreen } = useFastMarket();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: ''
  });

  const handleEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category: product.category
      });
      setEditingProduct(productId);
      setIsModalOpen(true);
    }
  };

  const handleAdd = () => {
    setFormData({ name: '', price: '', category: '' });
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (editingProduct) {
      updateProduct(editingProduct, {
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category
      });
    } else {
      addProduct({
        id: Date.now().toString(),
        name: formData.name,
        price: parseFloat(formData.price),
        category: formData.category,
        active: true
      });
    }
    setIsModalOpen(false);
  };

  const toggleActive = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      updateProduct(productId, { active: !product.active });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="py-4 px-4 md:py-8 md:px-16 border-b border-gray-200 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setCurrentScreen('operator-dashboard')}
            className="flex-shrink-0"
          >
            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
          </Button>
          <div className="min-w-0">
            <Logo size="md" />
          </div>
        </div>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAdd}
          className="flex items-center gap-1.5 md:gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Novo</span>
        </Button>
      </div>

      {/* Content */}
      <div className="p-4 md:p-8 lg:p-16 overflow-auto">
        <h1 className="mb-4 md:mb-8 font-bold text-[#1F2937] text-xl md:text-2xl">Produtos</h1>

        {/* Products List */}
        <div className="space-y-3 md:space-y-4">
          {products.map((product) => (
            <Card key={product.id}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#1F2937] mb-1 text-sm md:text-base truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 md:gap-4 flex-wrap">
                    <span className="text-[#22C55E] font-semibold text-sm md:text-base">
                      R$ {product.price.toFixed(2)}
                    </span>
                    <span className="text-xs md:text-sm text-[#717182]">
                      {product.category}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
                  <button
                    onClick={() => toggleActive(product.id)}
                    className="p-1.5 md:p-2 hover:bg-white rounded-lg transition-colors touch-manipulation"
                  >
                    {product.active ? (
                      <ToggleRight className="w-6 h-6 md:w-8 md:h-8 text-[#22C55E]" />
                    ) : (
                      <ToggleLeft className="w-6 h-6 md:w-8 md:h-8 text-[#717182]" />
                    )}
                  </button>

                  <button
                    onClick={() => handleEdit(product.id)}
                    className="p-2 md:p-3 bg-white rounded-lg hover:bg-[#F5F7FA] active:bg-[#E5E7EB] transition-colors touch-manipulation"
                  >
                    <Edit className="w-4 h-4 md:w-5 md:h-5 text-[#1F2937]" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <div className="space-y-4 md:space-y-6">
          <Input
            label="Nome do Produto"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />

          <Input
            label="Preço"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          <Input
            label="Categoria"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <Button
              variant="secondary"
              size="md"
              fullWidth
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              variant="primary"
              size="md"
              fullWidth
              onClick={handleSave}
            >
              Salvar
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}