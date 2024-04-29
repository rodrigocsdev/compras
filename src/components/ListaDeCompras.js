// src/components/ListaDeCompras.js

import React, { useState } from "react";
import "./ListaDeCompras.css";

const ListaDeCompras = () => {
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("listaDeCompras")) || []
  );
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [editItemId, setEditItemId] = useState(null);

  const handleAddItem = () => {
    if (itemName && itemValue) {
      if (editItemId !== null) {
        // Se estamos editando um item, atualizamos o item existente na lista
        const updatedItems = items.map((item) => {
          if (item.id === editItemId) {            
            return { ...item, name: itemName, value: parseFloat(itemValue) };
          }
          return item;
        });
        setItems(updatedItems);
        setEditItemId(null); // Resetar o ID de edição

        // Salvar a lista de compras no localStorage
        localStorage.setItem("listaDeCompras", JSON.stringify(updatedItems));
      } else {
        // Caso contrário, adicionamos um novo item à lista
        setItems([
          ...items,
          { id: Date.now(), name: itemName, value: parseFloat(itemValue) },
        ]);

        // Salvar a lista de compras no localStorage
        const newItems = [
          ...items,
          { id: Date.now(), name: itemName, value: parseFloat(itemValue) },
        ];
        localStorage.setItem("listaDeCompras", JSON.stringify(newItems));
      }
      // Limpar campos de entrada
      setItemName("");
      setItemValue("");
      inputRef.current.focus(); // adicione essa linha
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    // Salvar a lista de compras no localStorage
    localStorage.setItem(
      "listaDeCompras",
      JSON.stringify(items.filter((item) => item.id !== id))
    );
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      // Preencher os campos de entrada com os valores do item a ser editado
      setItemName(itemToEdit.name);
      setItemValue(itemToEdit.value);
      // Definir o ID do item sendo editado
      setEditItemId(id);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.value, 0);
  };

  const inputRef = React.createRef();

  return (
    <div className="container">
      <div className="header">
        <h1>Lista de Compras</h1>
      </div>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nome do item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          ref={inputRef} 
          autoFocus={false} // remova o autoFocus aqui
        />
        <input
          type="number"
          placeholder="Valor"
          value={itemValue}
          onChange={(e) => setItemValue(e.target.value)}
        />
        <button className="add-button" onClick={handleAddItem}>
          {editItemId !== null ? "Atualizar" : "Adicionar"}
        </button>
      </div>
      <ul className="items-list">
        {items.map((item) => (
          <li key={item.id}>
            <span>{item.name}</span>
            <span>R${item.value.toFixed(2)}</span>
            <button
              className="edit-button"
              onClick={() => handleEditItem(item.id)}
            >
              Editar
            </button>
            <button
              className="remove-button"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
      <div className="total">Total: R${calculateTotal().toFixed(2)}</div>
    </div>
  );
};

export default ListaDeCompras;
