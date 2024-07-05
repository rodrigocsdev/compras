import React, { useState, useEffect, useRef } from "react";
import "./ListaDeCompras.css";

const ListaDeCompras = () => {
  const initialItems = JSON.parse(localStorage.getItem("listaDeCompras")) || [];
  const [items, setItems] = useState(initialItems);
  const [itemName, setItemName] = useState("");
  const [itemValue, setItemValue] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  const containerRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("listaDeCompras", JSON.stringify(items));
  }, [items]);

  useEffect(() => {
    if (editItemId !== null && containerRef.current) {
      // Scroll to the top of the container when editing an item
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [editItemId]);

  const handleAddItem = () => {
    if (itemName && itemValue && itemQuantity) {
      const newItem = {
        id: items.length > 0 ? items[items.length - 1].id + 1 : 1,
        name: itemName,
        value: parseFloat(itemValue),
        quantity: parseInt(itemQuantity),
      };

      if (editItemId !== null) {
        const updatedItems = items.map((item) =>
          item.id === editItemId ? { ...newItem, id: editItemId } : item
        );
        setItems(updatedItems);
        setEditItemId(null);
      } else {
        setItems([...items, newItem]);
      }

      setItemName("");
      setItemValue("");
      setItemQuantity("");
    }
  };

  const handleRemoveItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleEditItem = (id) => {
    const itemToEdit = items.find((item) => item.id === id);
    if (itemToEdit) {
      setItemName(itemToEdit.name);
      setItemValue(itemToEdit.value.toString());
      setItemQuantity(itemToEdit.quantity.toString());
      setEditItemId(id);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];

      if (sortDirection === "asc") {
        return fieldA > fieldB ? 1 : fieldA < fieldB ? -1 : 0;
      } else {
        return fieldA < fieldB ? 1 : fieldA > fieldB ? -1 : 0;
      }
    } else {
      return 0;
    }
  });

  const filteredItems = sortedItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.value * item.quantity, 0);
  };

  return (
    <div className="container" ref={containerRef}>
      <div className="header">
        <h1>Lista de Compras</h1>
      </div>
      <div className="form-container">
        <input
          type="text"
          placeholder="Nome do item"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Valor"
          value={itemValue}
          onChange={(e) => setItemValue(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
        />
        <button className="add-button" onClick={handleAddItem}>
          {editItemId !== null ? "Atualizar" : "Adicionar"}
        </button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Pesquisar por nome"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="container-table">
      <table className="items-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("id")}>
              ID {sortField === "id" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("name")}>
              Nome {sortField === "name" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th onClick={() => handleSort("value")}>
              Valor {sortField === "value" && (sortDirection === "asc" ? "▲" : "▼")}
            </th>
            <th>Qtd</th>
            <th>Total</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>R${item.value.toFixed(2)}</td>
              <td>{item.quantity}</td>
              <td>R${(item.value * item.quantity).toFixed(2)}</td>
              <td>
                <button className="edit-button" onClick={() => handleEditItem(item.id)}>
                  Editar
                </button>
                <button className="remove-button" onClick={() => handleRemoveItem(item.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="container-total">
      <div className="total">Total: R${calculateTotal().toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ListaDeCompras;
