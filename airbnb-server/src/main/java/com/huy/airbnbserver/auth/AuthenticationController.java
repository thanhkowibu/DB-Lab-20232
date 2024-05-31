package com.huy.airbnbserver.auth;


import com.huy.airbnbserver.system.Result;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public Result register(
            @RequestBody @Valid RegistrationRequest request
    ) throws MessagingException {
        authenticationService.registerUser(request);
        return new Result(true, 202, "Register Success");
    }

    @PostMapping("/login")
    public Result login(
            @RequestBody @Valid LoginRequest request
    ) {
        return new Result(true, 200, "Login Success", authenticationService.authenticate(request));
    }


    @GetMapping("/activate")
    public Result activate(
            @RequestParam("token") String token
    ) {
        String res = authenticationService.activate(token);
        int code = 200;
        if (res.equals("Token has expired, a new token has been sent for this email!")) {
            code = 201;
        }
        return new Result(true, code, "Transaction done", res);
    }

    @GetMapping("/resend-token")
    public Result resend(
            @Email @RequestParam("email") String email
    ) {
        return new Result(true, 200, authenticationService.resend(email));
    }
}
