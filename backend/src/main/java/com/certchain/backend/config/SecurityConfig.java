package com.certchain.backend.config;

import com.certchain.backend.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.header.writers.ReferrerPolicyHeaderWriter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(Customizer.withDefaults())
                .csrf(csrf -> csrf.disable())
                .headers(headers -> headers
                        .contentTypeOptions(Customizer.withDefaults())
                        .frameOptions(frame -> frame.sameOrigin())
                        .referrerPolicy(referrer -> referrer.policy(ReferrerPolicyHeaderWriter.ReferrerPolicy.NO_REFERRER)))
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()
                        .requestMatchers("/actuator/health", "/actuator/health/**", "/actuator/info").permitAll()
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/auth/login").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/landing").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/network").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/gallery").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/ai").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/experience/admin/dashboard").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/experience/wallet/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/experience/settings/**").authenticated()
                        .requestMatchers(HttpMethod.PUT, "/api/experience/settings/**").hasAnyRole("ADMIN", "INSTITUTION_ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/certificates/wallet/**").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/certificates/profile/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/api/certificates/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/certificates/verify").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/certificates/verify-file").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/certificates/issue").hasAnyRole("ADMIN", "INSTITUTION_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/certificates/update").hasAnyRole("ADMIN", "INSTITUTION_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/certificates/revoke/**").hasAnyRole("ADMIN", "INSTITUTION_ADMIN")
                        .requestMatchers(HttpMethod.POST, "/api/institutions/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.GET, "/api/institutions/**").permitAll()
                        .anyRequest().authenticated());
        http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
