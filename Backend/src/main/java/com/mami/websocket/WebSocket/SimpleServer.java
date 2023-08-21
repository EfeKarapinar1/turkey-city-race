package com.mami.websocket.WebSocket;

import org.java_websocket.WebSocket;
import org.java_websocket.handshake.ClientHandshake;
import org.java_websocket.server.WebSocketServer;

import java.net.InetSocketAddress;
import java.util.Random;

public class SimpleServer extends WebSocketServer {

    public SimpleServer(InetSocketAddress inetSocketAddress) {
        super(inetSocketAddress);
    }

    @Override
    public void onOpen(WebSocket webSocket, ClientHandshake clientHandshake) {
        webSocket.send("Lokasyon Socketi!");
        System.out.println(webSocket.getRemoteSocketAddress() + " Bağlandı!");
    }

    @Override
    public void onClose(WebSocket webSocket, int i, String s, boolean b) {
        System.out.println(webSocket.getRemoteSocketAddress() + " Ayrıldı!");
    }

    @Override
    public void onMessage(WebSocket webSocket, String s) {
        Random r = new Random();

        System.out.println(webSocket.getRemoteSocketAddress() + " 'den yeni mesaj -> " + s);
        if(s.equals("random_lokasyon_ver"))
        {
            String randomCity = String.valueOf(r.nextInt(1,82));
            webSocket.send(randomCity);
        }
    }

    @Override
    public void onError(WebSocket webSocket, Exception e) {
        System.err.println("an error occurred on connection " + webSocket.getRemoteSocketAddress()  + ":" + e);
    }

    @Override
    public void onStart() {
        System.out.println("Server başlatıldı!");
    }

    public static void main(String[] args) {
        String host = "localhost";
        int port = 8887;

        WebSocketServer server = new SimpleServer(new InetSocketAddress(host, port));
        server.run();
    }
}
