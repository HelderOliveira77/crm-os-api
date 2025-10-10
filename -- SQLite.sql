-- SQLite

SELECT * FROM Orders;


INSERT INTO Orders (title, description, status, priority, createdAt, updatedAt)
VALUES ('Nova Ordem de Serviço', 'Verificar o sistema de e-mail do cliente.', 'Aberto', '2', datetime('now'), datetime('now'));